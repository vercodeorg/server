import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercise } from "src/entities/exercise.entity";
import { ExercisesController } from "./exercises.controller";
import { ExercisesService } from "./exercises.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
