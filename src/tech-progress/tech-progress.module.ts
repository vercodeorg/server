import { Module } from "@nestjs/common";
import { TechProgressService } from "./tech-progress.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TechProgress } from "src/entities/tech-progress.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechProgress])],
  providers: [TechProgressService],
  exports: [TechProgressService],
})
export class TechProgressModule {}
