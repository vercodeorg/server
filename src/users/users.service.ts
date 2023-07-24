import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UpdateUserDTO } from 'src/dtos/users/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    create(createUserDTO: CreateUserDTO){
        const newUser = this.userRepository.create({...createUserDTO})
        return this.userRepository.save(newUser)
    }

    delete(id: number){
        return this.userRepository.delete(id)
    }

    update(id: number, updateUserDTO: UpdateUserDTO){
        return this.userRepository.update(id, updateUserDTO)
    }
}
