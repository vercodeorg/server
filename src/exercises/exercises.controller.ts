import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
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

}
