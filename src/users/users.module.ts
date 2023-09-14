import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { Level } from 'src/entities/level.entity';
import { Project } from 'src/entities/project.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { UserLevel } from 'src/entities/user-level.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { User } from 'src/entities/user.entity';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { UsersLevelsService } from 'src/users-levels/users-levels.service';
import { UsersProjectsService } from 'src/users-projects/users-projects.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';



@Module({
  imports: [TypeOrmModule.forFeature(
      [User, UserLevel, Level, Project, UserProject, UserExercise, Exercise]
    )],
  providers: [UsersService, UsersLevelsService, UsersProjectsService, UsersExercisesService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
