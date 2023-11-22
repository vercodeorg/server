import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDTO } from 'src/dtos/projects/createProject.dto';
import { UpdateProjectDTO } from 'src/dtos/projects/updateProject.dto';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
    
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ){}

    create(createProjectDTO: CreateProjectDTO){
        const newLevel = this.projectsRepository.create(createProjectDTO)
        return this.projectsRepository.save(newLevel)
    }

    delete(id: number){
        return this.projectsRepository.delete(id)
    }

    update(id: number, updateProjectDTO: UpdateProjectDTO){
        return this.projectsRepository.update(id, updateProjectDTO)
    }
}
