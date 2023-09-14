import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UpdateUserDTO } from 'src/dtos/users/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { UsersLevelsService } from 'src/users-levels/users-levels.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private usersLevelsService: UsersLevelsService,
        private dataSource: DataSource 
    ){}

    async findById(id: string){
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findAll(){
        const user = await this.userRepository.find();
        console.log(user)
        return user
    }

    async create(createUserDTO: CreateUserDTO){
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newUser = this.userRepository.create(createUserDTO);
            await this.userRepository.save(newUser);
            return await this.usersLevelsService.create(newUser);
        }
        catch(err){
            console.log(err)
            await queryRunner.rollbackTransaction();
        }
        finally{
            await queryRunner.release();
        }
    }

    delete(id: number){
        return this.userRepository.delete(id)
    }

    update(id: number, updateUserDTO: UpdateUserDTO){
        return this.userRepository.update(id, updateUserDTO)
    }

    async findLevels(id: string){
        return await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                usersLevels: {
                    level: true
                }
            }
        })
    }

    async findBadges(id: string){
        return await this.userRepository.findOne({
            relations: {
                usersBadges: {
                    badge: true
                }
            },
            where: {
                id: id
            }
        })
    }
}
