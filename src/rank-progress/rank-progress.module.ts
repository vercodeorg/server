import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankProgress } from 'src/entities/rank-progress.entity';
import { RankProgressService } from './rank-progress.service';

@Module({
    imports: [TypeOrmModule.forFeature([RankProgress])],
    providers: [RankProgressService],
    exports: [RankProgressService]
})
export class RankProgressModule { }
