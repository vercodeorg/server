import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPoints } from "src/entities/user-points.entity";
import { UsersPointsService } from "./users-points.service";
import { RankProgress } from "src/entities/rank-progress.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserPoints, RankProgress])],
  providers: [UsersPointsService],
  exports: [UsersPointsService],
})
export class UsersPointsModule {}
