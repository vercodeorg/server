import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPoints } from 'src/entities/user-points.entity';
import { UsersPointsService } from './users-points.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserPoints])],
    providers: [UsersPointsService],
    exports: [UsersPointsService]
})
export class UsersPointsModule {}
