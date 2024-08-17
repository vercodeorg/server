import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercise } from "src/entities/exercise.entity";
import { Level } from "src/entities/level.entity";
import { Project } from "src/entities/project.entity";
import { UserExercise } from "src/entities/user-exercise.entity";
import { UserLevel } from "src/entities/user-level.entity";
import { UserProject } from "src/entities/user-project.entity";
import { User } from "src/entities/user.entity";
import { UsersExercisesService } from "src/users-exercises/users-exercises.service";
import { UsersLevelsService } from "src/users-levels/users-levels.service";
import { UsersProjectsService } from "src/users-projects/users-projects.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { S3Service } from "src/s3/s3.service";
import { UsersBadgeService } from "src/users-badge/users-badge.service";
import { UserBadges } from "src/entities/user-badges.entity";
import { BadgesService } from "src/badges/badges.service";
import { UsersTechProgressService } from "src/users-tech-progress/users-tech-progress.service";
import { Badge } from "src/entities/badge.entity";
import { UserTechProgress } from "src/entities/user-tech-progress.entity";
import { TechProgress } from "src/entities/tech-progress.entity";
import { UserPoints } from "src/entities/user-points.entity";
import { RankProgress } from "src/entities/rank-progress.entity";
import { ExerciseSubmission } from "src/entities/exercise-submission.entity";
import { HttpModule } from "@nestjs/axios";
import { UsersExercisesModule } from "src/users-exercises/users-exercises.module";
import { UsersLevelsModule } from "src/users-levels/users-levels.module";

@Module({
  // imports: [HttpModule, TypeOrmModule.forFeature(
  //     [User, UserLevel, Level, Project, UserProject, UserExercise, Exercise, UserBadges, Badge, UserTechProgress, TechProgress, UserPoints, RankProgress, ExerciseSubmission]
  //   )],
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserLevel,
      Level,
      Project,
      UserProject,
      UserExercise,
      Exercise,
      UserBadges,
      Badge,
      UserTechProgress,
      TechProgress,
      UserPoints,
      RankProgress,
      ExerciseSubmission,
    ]),
    HttpModule,
    UsersExercisesModule,
  ],
  providers: [
    UsersService,
    UsersLevelsService,
    UsersProjectsService,
    UsersBadgeService,
    BadgesService,
    UsersTechProgressService,
    S3Service,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
