import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UpdateUserDTO } from 'src/dtos/users/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) { }

  @Get('id/:id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    await this.usersService.create(createUserDTO)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.usersService.delete(id)
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO) {
    this.usersService.update(id, updateUserDTO)
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return await this.usersService.findByUsename(username);
  }

  @Get(':id/levels')
  async findLevels(@Param('id') id: number) {
    return await this.usersService.findLevels(id);
  }

  @Get(':id/projects')
  async findProjects(@Param('id') id: number) {
    return await this.usersService.findProjects(id);
  }

  @Get(':id/exercises')
  async findExercises(@Param('id') id: number) {
    return await this.usersService.findExercises(id);
  }
}
