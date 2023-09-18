import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTechProgress } from 'src/entities/user-tech-progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersTechProgressService {

    constructor(
        @InjectRepository(UserTechProgress)
        private usersTechProgress: Repository<UserTechProgress>
    ){}
}
