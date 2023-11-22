import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDTO } from 'src/dtos/exercises/createExercise.dto';
import { UpdateExerciseDTO } from 'src/dtos/exercises/updateExercise.dto';
import { Exercise } from 'src/entities/exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {

    constructor(
        @InjectRepository(Exercise)
        private exercisesRepository: Repository<Exercise>,
    ) { }

    async create(createExerciseDTO: CreateExerciseDTO) {
        const newExercise = this.exercisesRepository.create(createExerciseDTO);
        await this.exercisesRepository.save(newExercise);
    }

    async delete(id: number) {
        return await this.exercisesRepository.delete(id);
    }

    async update(id: number, updateExerciseDTO: UpdateExerciseDTO) {
        return await this.exercisesRepository.update(id, updateExerciseDTO);
    }

    async findById(id: number): Promise<Exercise> {
        return await this.exercisesRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findByProject(projectId: number): Promise<Exercise[]> {
        return await this.exercisesRepository.find({
            relations: {
                project: true
            },
            where: {
                project: {
                    id: projectId
                }
            }
        })
    }
}
