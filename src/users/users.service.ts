import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UpdateUserDTO } from 'src/dtos/users/updateUser.dto';
import { RankProgress } from 'src/entities/rank-progress.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { User } from 'src/entities/user.entity';
import { S3Service } from 'src/s3/s3.service';
import { UsersBadgeService } from 'src/users-badge/users-badge.service';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { UsersLevelsService } from 'src/users-levels/users-levels.service';
import { UsersProjectsService } from 'src/users-projects/users-projects.service';
import { UsersTechProgressService } from 'src/users-tech-progress/users-tech-progress.service';
import { encodePassword } from 'src/utils/bcrypt';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(RankProgress)
        private rankProgressRepository: Repository<RankProgress>,
        private usersLevelsService: UsersLevelsService,
        private usersProjectsService: UsersProjectsService,
        @Inject(forwardRef(() => UsersExercisesService))
        private usersExercisesService: UsersExercisesService,
        private usersBadgesService: UsersBadgeService,
        private usersTechProgressService: UsersTechProgressService,
        private s3Service: S3Service,
        private dataSource: DataSource
    ) {}

    async findById(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                usersBadges: {
                    badge: true
                },
                usersTechProgress: {
                    techProgress: true
                },
                usersExercises: {
                    exercise: {
                        project: true
                    }
                },
                usersProjects: {
                    project: {
                        level: true
                    }
                },
                usersLevels: {
                    level: true
                },
            }
        })
        for (const userBadge of user.usersBadges) {
            const key = userBadge.badge.imageUrl
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: `svgs/${key}`
            }

            try {
                const command = new GetObjectCommand(params)
                const url = await getSignedUrl(this.s3Service.getS3Client(), command, { expiresIn: 600 })
                userBadge.badge.imageUrl = url
            } catch (error) {
                console.error(`Error to get signedUrl ${key} from aws: ${error.message}`)
            }
        }
        for (const userExercise of user.usersExercises) {
            const key = userExercise.exercise.imageInstructions
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: `images/${key}.png`
            }

            try {
                const command = new GetObjectCommand(params)
                const url = await getSignedUrl(this.s3Service.getS3Client(), command, { expiresIn: 600 })
                userExercise.exercise.imageInstructions = url
            } catch (error) {
                console.error(`Error to get signedUrl ${key} from aws: ${error.message}`)
            }
        }
        return user
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        });
    }

    async create(createUserDTO: CreateUserDTO) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const password = await encodePassword(createUserDTO.password);
            const newUser = this.userRepository.create({ ...createUserDTO, password });
            await this.userRepository.save(newUser);
            await this.usersLevelsService.addToNewUserInitialLevels(newUser);
            await this.usersProjectsService.addToNewUserInitialProjects(newUser);
            await this.usersExercisesService.addToNewUserInitalExercises(newUser);
            await this.usersBadgesService.addToNewUserInitialBadges(newUser);
            await this.usersTechProgressService.addToNewUserInitialTechProgress(newUser);
            return
        }
        catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }

    delete(id: number) {
        return this.userRepository.delete(id)
    }

    update(id: number, updateUserDTO: UpdateUserDTO) {
        return this.userRepository.update(id, updateUserDTO)
    }

    findExerciseById(id: number, exerciseId: number) {
        return this.userRepository.find({
            where: {
                id: id,
                usersExercises: {
                    exercise: {
                        id: exerciseId
                    }
                }
            },
            relations: {
                usersExercises: {
                    exercise: true
                }
            }
        })
    }

    async updateXpPoints(userExercise: UserExercise) {
        const user = await this.userRepository.findOne({
            where: {
                id: userExercise.user.id
            }
        })
        const rankProgress = await this.rankProgressRepository.findOne({
            where: {
                level: user.level
            }
        })
        await this.userRepository.createQueryBuilder().update()
            .set({
                coins: userExercise.user.coins + userExercise.exercise.coinsToWin,
                xpPoints: userExercise.user.xpPoints + userExercise.exercise.xpToWin,
            })
            .where("id = :id", { id: userExercise.user.id })
            .execute()
        if (user.xpPoints + userExercise.exercise.xpToWin > rankProgress.requiredXpToUpdate) {
            await this.userRepository.createQueryBuilder().update()
                .set({
                    level: user.level + 1
                })
                .where("id = :id", { id: userExercise.user.id })
                .execute()
        }
    }
}
