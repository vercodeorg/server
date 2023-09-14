import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateExerciseDTO } from 'src/dtos/exercises/createExercise.dto';
import { UpdateExerciseDTO } from 'src/dtos/exercises/updateExercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {

    constructor(
        private exercisesService: ExercisesService
    ){}

    @Post()
    createExercise(@Body() createExerciseDTO: CreateExerciseDTO){
        this.exercisesService.create(createExerciseDTO)
    }

    @Delete(':id')
    deleteExercise(@Param('id') id: number){
        this.exercisesService.delete(id);
    }

    @Put(':id')
    updateExercise(@Param('id') id: number, @Body() updateExerciseDTO: UpdateExerciseDTO){
        this.exercisesService.update(id, updateExerciseDTO);
    }

    @Get(':id')
    async findById(@Param('id') id: number){
        return await this.exercisesService.findById(id);
    }

    @Get('project/:id')
    async findExercisesByProject(@Param('id') projectId: number){
        return await this.exercisesService.findByProject(projectId);
    }

    @Post('submit')
    async submitExercise(){
        return this.exercisesService.submit();
    }

}
