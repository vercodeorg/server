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
        private badgesService: BadgesService,
    ) { }

    async addToNewUserInitialBadges(user: User) {
        try {
            const newUserBadge = this.usersBadgeRepository.create();
            newUserBadge.user = user;
            newUserBadge.badge = await this.badgesService.findOne(1);
            await this.usersBadgeRepository.save(newUserBadge);
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    }
}
