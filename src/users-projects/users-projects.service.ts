import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { User } from 'src/entities/user.entity';
import { UsersExercisesService } from 'src/users-exercises/users-exercises.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersProjectsService {

    constructor(
        @InjectRepository(UserProject)
        private usersProjectsRepository: Repository<UserProject>,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private usersExercisesService: UsersExercisesService 
    ) { }

    async create(user: User){
        try{
            const newUserProject = this.usersProjectsRepository.create()
            newUserProject.user = user;
            newUserProject.project = await this.projectRepository.findOne({
                where: {
                    id: 1
                }
            })
            await this.usersProjectsRepository.save(newUserProject);
            await this.usersExercisesService.create(user);
        }catch(err){
            console.log(err)
            throw new Error(err)
        }

    }
}
