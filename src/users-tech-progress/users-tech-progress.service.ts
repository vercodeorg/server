import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TechProgress } from "src/entities/tech-progress.entity";
import { UserTechProgress } from "src/entities/user-tech-progress.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersTechProgressService {
  constructor(
    @InjectRepository(UserTechProgress)
    private usersTechProgressRepository: Repository<UserTechProgress>,
    @InjectRepository(TechProgress)
    private techProgressRepository: Repository<TechProgress>
  ) {}

  async addToNewUserInitialTechProgress(user: User) {
    try {
      const newUserTechProgress = this.usersTechProgressRepository.create();
      newUserTechProgress.user = user;
      newUserTechProgress.techProgress =
        await this.techProgressRepository.findOne({ where: { id: 1 } });
      await this.usersTechProgressRepository.save(newUserTechProgress);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
