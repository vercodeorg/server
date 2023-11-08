import { Module } from '@nestjs/common';
import { ExercisesSubmissionsService } from './exercises-submissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseSubmission } from 'src/entities/exercise-submission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ExerciseSubmission])],
    providers: [ExercisesSubmissionsService]
})
export class ExercisesSubmissionsModule {}
