import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { UsersExercisesService } from "./users-exercises.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users-exercises")
export class UsersExercisesController {
  constructor(private usersExercisesService: UsersExercisesService) {}

  @UseGuards(JwtAuthGuard)
  @Post("submit/:id")
  async submitExercise(
    @Param("id") id: number,
    @Body() codeResult: { code: string }
  ) {
    return this.usersExercisesService.submitExercise(id, codeResult);
  }
}
