import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RankProgress } from "src/entities/rank-progress.entity";
import { Repository } from "typeorm";

@Injectable()
export class RankProgressService {
  constructor(
    @InjectRepository(RankProgress)
    private rankProgressRepository: Repository<RankProgress>
  ) {}
}
