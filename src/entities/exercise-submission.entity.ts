import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserExercise } from "./user-exercise.entity";

@Entity("exercises-submissions")
export class ExerciseSubmission {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @Column({ name: "code_result" })
    codeResult: string

    @UpdateDateColumn({ name: 'submission_date' })
    submisisonDate: string

    @ManyToOne(() => UserExercise, usersExercises => usersExercises.exercise)
    userExercise: UserExercise
}
