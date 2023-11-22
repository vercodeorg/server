import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersProjectsService {

  constructor(
    @InjectRepository(UserProject)
    private usersProjectsRepository: Repository<UserProject>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) { }

  async addToNewUserInitialProjects(user: User) {
    try {
      const projects = await this.projectRepository.find();
      projects.map(async (pj) => {
        const newUserProject = this.usersProjectsRepository.create()
        newUserProject.user = user;
        newUserProject.project = pj;
        await this.usersProjectsRepository.save(newUserProject);
      })
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }

  }
}
