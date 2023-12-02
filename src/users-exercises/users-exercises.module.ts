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
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, UsersModule, TypeOrmModule.forFeature([UserExercise, Exercise, ExerciseSubmission, User, RankProgress])],
  providers: [UsersExercisesService],
  controllers: [UsersExercisesController],
  exports: [UsersExercisesService]
})
export class UsersExercisesModule {}
