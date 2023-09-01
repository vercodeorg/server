import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersLevelsService } from 'src/users-levels/users-levels.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserLevel } from 'src/entities/user-level.entity';
import { Level } from 'src/entities/level.entity';
import { Project } from 'src/entities/project.entity';
import { UsersProjectsService } from 'src/users-projects/users-projects.service';
import { UserProject } from 'src/entities/user-project.entity';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { Exercise } from 'src/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [User, UserLevel, Level, Project, UserProject, UserExercise, Exercise]
  )],
  providers: [UsersService, UsersLevelsService, UsersProjectsService, UsersExercisesService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
