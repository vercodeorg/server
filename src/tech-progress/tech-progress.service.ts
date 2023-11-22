import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechProgress } from 'src/entities/tech-progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechProgressService {

    constructor(
        @InjectRepository(TechProgress)
        private techProgressRepository: Repository<TechProgress>
    ){}
}
