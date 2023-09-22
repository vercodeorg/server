import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadgesService } from 'src/badges/badges.service';
import { UserBadges } from 'src/entities/user-badges.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersBadgeService {

    constructor(
        @InjectRepository(UserBadges)
        private usersBadgeRepository: Repository<UserBadges>,
        private badgesService: BadgesService
    ) { }

    async connectBadgeToUser(user: User) {
        const newUserBadge = this.usersBadgeRepository.create();
        newUserBadge.user = user;
        newUserBadge.badge = await this.badgesService.findOne(1);
        return await this.usersBadgeRepository.save(newUserBadge);
    }
}
