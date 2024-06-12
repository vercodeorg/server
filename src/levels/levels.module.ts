import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Level } from "src/entities/level.entity";
import { User } from "src/entities/user.entity";
import { LevelsController } from "./levels.controller";
import { LevelsService } from "./levels.service";

@Module({
  imports: [TypeOrmModule.forFeature([Level, User])],
  providers: [LevelsService],
  controllers: [LevelsController],
})
export class LevelsModule {}
