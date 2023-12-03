import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RankProgress } from 'src/entities/rank-progress.entity';
import { UserPoints } from 'src/entities/user-points.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersPointsService {

    constructor(
        @InjectRepository(UserPoints)
        private usersPointsRepository: Repository<UserPoints>,
        @InjectRepository(RankProgress)
        private rankProgressRepository: Repository<RankProgress>
    ) { }

}
