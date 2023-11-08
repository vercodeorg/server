import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from 'src/entities/level.entity';
import { UserLevel } from 'src/entities/user-level.entity';
import { UsersLevelsService } from './users-levels.service';

@Module({
  imports: [TypeOrmModule.forFeature(
    [UserLevel, Level]
  )],
  providers: [UsersLevelsService]
})
export class UsersLevelsModule { }
