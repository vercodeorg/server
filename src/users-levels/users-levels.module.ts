import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from 'src/entities/level.entity';
import { Project } from 'src/entities/project.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { UserLevel } from 'src/entities/user-level.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { UsersProjectsService } from 'src/users-projects/users-projects.service';
import { UsersLevelsService } from './users-levels.service';
import { Exercise } from 'src/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [UserLevel, Level, UserProject, Project, UserExercise, Exercise]
  )],
  providers: [UsersLevelsService, UsersProjectsService, UsersExercisesService]
})
export class UsersLevelsModule { }
