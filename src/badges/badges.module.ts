import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from 'src/entities/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgesService]
})
export class BadgesModule {}
