import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/entities/project.entity";
import { UserProject } from "src/entities/user-project.entity";
import { UsersProjectsService } from "./users-projects.service";
import { UsersProjectsController } from "./users-projects.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserProject, Project])],
  providers: [UsersProjectsService],
  controllers: [UsersProjectsController],
  exports: [UsersProjectsService],
})
export class UsersProjectsModule {}
