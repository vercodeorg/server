import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { UsersExercisesService } from './users-exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserExercise, Exercise])],
  providers: [UsersExercisesService]
})
export class UsersExercisesModule {}
