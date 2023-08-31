import { Module } from '@nestjs/common';
import { UsersExercisesService } from './users-exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { Exercise } from 'src/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserExercise, Exercise])],
  providers: [UsersExercisesService]
})
export class UsersExercisesModule {}
