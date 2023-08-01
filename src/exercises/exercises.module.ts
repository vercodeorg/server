import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
    imports: [TypeOrmModule.forFeature([Exercise])],
    providers: [ExercisesService],
    controllers: [ExercisesController]
})
export class ExercisesModule {

}
