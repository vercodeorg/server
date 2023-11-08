import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { UsersExercisesService } from './users-exercises.service';
import { UsersExercisesController } from './users-exercises.controller';
import { ExerciseSubmission } from 'src/entities/exercise-submission.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserExercise, Exercise, ExerciseSubmission])],
  providers: [UsersExercisesService],
  controllers: [UsersExercisesController]
})
export class UsersExercisesModule {}
