import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseSubmission } from 'src/entities/exercise-submission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesSubmissionsService {
    
    constructor(
        @InjectRepository(ExerciseSubmission)
        private exercisesSubmissionsRepository: Repository<ExerciseSubmission>
    ){}
}
