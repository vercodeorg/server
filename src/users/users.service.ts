import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UpdateUserDTO } from 'src/dtos/users/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { S3Service } from 'src/s3/s3.service';
import { UsersLevelsService } from 'src/users-levels/users-levels.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private usersLevelsService: UsersLevelsService,
        private s3Service: S3Service,
        private dataSource: DataSource
    ) { }

    async findById(id: number) {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findAll() {
        const user = await this.userRepository.find();
        console.log(user)
        return user
    }

    async create(createUserDTO: CreateUserDTO) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newUser = this.userRepository.create(createUserDTO);
            await this.userRepository.save(newUser);
            return await this.usersLevelsService.create(newUser);
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

    async findByUsename(username: string) {
        const user = await this.userRepository.findOne({
            where: {
                username: username
            },
            relations: {
                usersBadges: {
                    badge: true
                },
                usersPoints: {
                    rankProgress: true
                },
                usersTechProgress: {
                    techProgress: true
                }
            }
        })
        for (const userBadge of user.usersBadges) {
            const key = userBadge.badge.imageUrl
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: `svgs/${key}.svg`
            }
            
            try{
                const command = new GetObjectCommand(params)
                const url = await getSignedUrl(this.s3Service.getS3Client(), command, { expiresIn: 60 })
                userBadge.badge.imageUrl = url
            }catch(error){
                console.error(`Error to get signedUrl ${key} from aws: ${error.message}`)
            }
        }
        return user
    }

    async findLevels(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                usersLevels: {
                    level: true
                }
            }
        })
        return user.usersLevels;
    }

    async findProjects(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                usersProjects: {
                    project: true,
                }
            }
        })
        return user.usersProjects;
    }

    async findExercises(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                usersExercises: {
                    exercise: true,
                }
            }
        })
        return user.usersExercises;
    }
}
