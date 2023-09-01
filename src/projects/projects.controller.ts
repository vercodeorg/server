import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from 'src/dtos/projects/createProject.dto';
import { UpdateProjectDTO } from 'src/dtos/projects/updateProject.dto';

@Controller('projects')
export class ProjectsController {

    constructor(
        private projectsService: ProjectsService
    ){}

    @Post()
    createLevel(@Body() createProjectDTO: CreateProjectDTO){
        this.projectsService.create(createProjectDTO)
    }

    @Delete(':id')
    deleteLevel(@Param('id') id: number){
        this.projectsService.delete(id)
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateProjectDTO: UpdateProjectDTO){
        this.projectsService.update(id, updateProjectDTO)
    }
}
