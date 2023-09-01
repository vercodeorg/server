import { Body, Controller, Delete, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UpdateUserDTO } from 'src/dtos/users/updateUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO){
        await this.usersService.create(createUserDTO)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        this.usersService.delete(id)
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO){
        this.usersService.update(id, updateUserDTO)
    }

}
