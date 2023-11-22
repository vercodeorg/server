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

    async addToNewUserInitialPoints(user: User) {
        try {
            const newUserPoints = this.usersPointsRepository.create();
            newUserPoints.user = user;
            newUserPoints.rankProgress = await this.rankProgressRepository.findOne({ where: { id: 1 } });
            await this.usersPointsRepository.save(newUserPoints);
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    }
}
