import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { UserProject } from 'src/entities/user-project.entity';
import { User } from 'src/entities/user.entity';
import { Status } from 'src/types/status';
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

    async unlockProject(id: number, projectId: string) {
        try {
            const usersProjects = await this.usersProjectsRepository.find({
                where: {
                    id: id 
                },
                relations: {
                    project: true,
                    user: true
                }
            })
            const currentUsersProjects = usersProjects.find((up) => {
                return up.project.id === Number(projectId)
            })
            if(currentUsersProjects.project.unlockCost < currentUsersProjects.user.coins){
               await this.usersProjectsRepository.createQueryBuilder().update().set({
                   projectStatus: Status.IN_PROGRESS,
                   user: {
                    coins: currentUsersProjects.user.coins - currentUsersProjects.project.unlockCost
                   }
               })
               .where(
                 "id = :id", {id: currentUsersProjects.id}    
               )
               .execute()
               return {
                    success: true,
                    message: "Projeto Desbloqueado"
               }
            }else {
                return {
                    success: false,
                    message: "Você não possui coins suficientes!"
                } 
            } 
        }catch(e){
            console.error(e)
            throw new Error(e)
        } 
  }
}
