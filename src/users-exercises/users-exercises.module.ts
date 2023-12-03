import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { UsersExercisesService } from './users-exercises.service';
import { UsersExercisesController } from './users-exercises.controller';
import { ExerciseSubmission } from 'src/entities/exercise-submission.entity';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/entities/user.entity';
import { RankProgress } from 'src/entities/rank-progress.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule} from 'src/users/users.module';
import { UsersLevelsService } from 'src/users-levels/users-levels.service';
import { UsersProjectsService } from 'src/users-projects/users-projects.service';
import { UsersBadgeService } from 'src/users-badge/users-badge.service';
import { UsersTechProgressService } from 'src/users-tech-progress/users-tech-progress.service';
import { S3Service } from 'src/s3/s3.service';
import { UserLevel } from 'src/entities/user-level.entity';
import { Level } from 'src/entities/level.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { Project } from 'src/entities/project.entity';
import { UserBadges } from 'src/entities/user-badges.entity';
import { BadgesService } from 'src/badges/badges.service';
import { UserTechProgress } from 'src/entities/user-tech-progress.entity';
import { TechProgress } from 'src/entities/tech-progress.entity';
import { Badge } from 'src/entities/badge.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserExercise, Exercise, ExerciseSubmission, User, RankProgress, UserLevel, Level, UserProject, Project, UserBadges, UserTechProgress, TechProgress, Badge])],
  providers: [UsersExercisesService, UsersService, UsersLevelsService, UsersProjectsService, UsersBadgeService, UsersTechProgressService, S3Service, BadgesService],
  controllers: [UsersExercisesController],
  exports: [UsersExercisesService]
})
export class UsersExercisesModule {}
