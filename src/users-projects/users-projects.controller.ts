import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { UsersProjectsService } from "./users-projects.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users-projects")
export class UsersProjectsController {
  constructor(private usersProjectsService: UsersProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":id/project/:projectId")
  findLevelById(
    @Param("id") id: number,
    @Param("projectId") projectId: string
  ) {
    return this.usersProjectsService.unlockProject(id, projectId);
  }
}
