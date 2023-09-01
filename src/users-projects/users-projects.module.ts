import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from 'src/entities/user-project.entity';
import { UsersProjectsService } from './users-projects.service';
import { Project } from 'src/entities/project.entity';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { Exercise } from 'src/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject, Project, UserExercise, Exercise])],
  providers: [UsersProjectsService, UsersExercisesService]
})
export class UsersProjectsModule {}
