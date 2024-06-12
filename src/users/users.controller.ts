import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UpdateUserDTO } from "src/dtos/users/updateUser.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findById(@Param("id") id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    this.usersService.delete(id);
  }

  @Put(":id")
  updateUser(@Param("id") id: number, @Body() updateUserDTO: UpdateUserDTO) {
    this.usersService.update(id, updateUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/exercise/:exerciseId")
  findLevelById(
    @Param("id") id: number,
    @Param("exerciseId") exerciseId: number
  ) {
    return this.usersService.findExerciseById(id, exerciseId);
  }
}
