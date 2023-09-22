import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from 'src/entities/level.entity';
import { UserLevel } from 'src/entities/user-level.entity';
import { User } from 'src/entities/user.entity';
import { UsersProjectsService } from 'src/users-projects/users-projects.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersLevelsService {

  constructor(
    @InjectRepository(UserLevel)
    private usersLevelsRepository: Repository<UserLevel>,
    @InjectRepository(Level)
    private levelsRepository: Repository<Level>,
    private usersProjectsService: UsersProjectsService
  ) { }

  async create(user: User) {
    try {
      const levels = await this.levelsRepository.find();
      levels.map(async (lv) => {
        const newUserLevel = this.usersLevelsRepository.create()
        newUserLevel.user = user
        newUserLevel.level = lv
        await this.usersLevelsRepository.save(newUserLevel)
      })
      await this.usersProjectsService.create(user);
    }
    catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
}
