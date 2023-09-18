import { Module } from '@nestjs/common';
import { UsersTechProgressService } from './users-tech-progress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTechProgress } from 'src/entities/user-tech-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTechProgress])],
  providers: [UsersTechProgressService]
})
export class UsersTechProgressModule {}
