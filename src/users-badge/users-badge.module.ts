import { Module } from '@nestjs/common';
import { UsersBadgeService } from './users-badge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBadges } from 'src/entities/user-badges.entity';
import { BadgesService } from 'src/badges/badges.service';
import { Badge } from 'src/entities/badge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBadges, Badge])
  ],
  providers: [UsersBadgeService, BadgesService]
})
export class UsersBadgeModule {}
