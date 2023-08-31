import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { UserExercise } from 'src/entities/user-exercise.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersExercisesService {

    constructor(
        @InjectRepository(UserExercise)
        private usersExercisesRepository: Repository<UserExercise>,
        @InjectRepository(Exercise)
        private exercisesRepository: Repository<Exercise>
    ){}

    async create(user: User){
        try{
            const exercises = await this.exercisesRepository.find();
            exercises.map(ex => {
                const newUserExercise = this.usersExercisesRepository.create();
                newUserExercise.exercise = ex
                newUserExercise.user = user;
                this.usersExercisesRepository.save(newUserExercise);
            })
        }catch(err){
            console.log(err)
            throw new Error(err)
        }
    }
}
