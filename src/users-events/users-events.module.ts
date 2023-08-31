import { Module } from '@nestjs/common';
import { UsersEventsService } from './users-events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEvents } from 'src/entities/user-events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEvents])],
  providers: [UsersEventsService]
})
export class UsersEventsModule {}
