import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { Project } from 'src/entities/project.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { UsersProjectsService } from './users-projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject, Project, UserExercise, Exercise])],
  providers: [UsersProjectsService, UsersExercisesService]
})
export class UsersProjectsModule {}
