import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
    
    constructor(
        @InjectRepository(Exercise)
        private exercisesRepository: Repository<Exercise>
    ){}
}
