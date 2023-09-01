import { ExerciseStatus } from "src/types/exerciseStatus";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exercise } from "./exercise.entity";
import { User } from "./user.entity";

@Entity("users_exercises")
export class UserExercise {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "exercise_status",
        type: "enum",
        enum: ExerciseStatus,
        default: ExerciseStatus.NOT_STARTED
    })
    exerciseStatus: ExerciseStatus

    @UpdateDateColumn({ name: "date_last_try" })
    dateLastTry: string

    @ManyToOne(() => User, user => user.usersExercises)
    user: User

    @ManyToOne(() => Exercise, exercise => exercise.usersExercise)
    exercise: Exercise
}