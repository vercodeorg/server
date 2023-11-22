import { ExerciseStatus } from "src/types/exerciseStatus";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise.entity";
import { User } from "./user.entity";
import { ExerciseSubmission } from "./exercise-submission.entity";

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

    @ManyToOne(() => User, user => user.usersExercises)
    user: User

    @ManyToOne(() => Exercise, exercise => exercise.usersExercise)
    exercise: Exercise

    @OneToMany(() => ExerciseSubmission, exerciseSubmission => exerciseSubmission.userExercise)
    exerciseSubmission: ExerciseSubmission[]
}
