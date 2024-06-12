import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLevelDTO } from "src/dtos/levels/createLevel.dto";
import { UpdateLevelDTO } from "src/dtos/levels/updateLevel.dto";
import { Level } from "src/entities/level.entity";
import { User } from "src/entities/user.entity";
import { Status } from "src/types/status";
import { Repository } from "typeorm";

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private levelsRepository: Repository<Level>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createLevelDTO: CreateLevelDTO) {
    const newLevel = this.levelsRepository.create(createLevelDTO);
    return this.levelsRepository.save(newLevel);
  }

  delete(id: number) {
    return this.levelsRepository.delete(id);
  }

  update(id: number, updateLevelDTO: UpdateLevelDTO) {
    return this.levelsRepository.update(id, updateLevelDTO);
  }

  async unlock(id: number) {}
}
