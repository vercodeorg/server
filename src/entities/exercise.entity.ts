import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { UserExercise } from "./user-exercise.entity";

@Entity("exercises")
export class Exercise {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: "int", name: "coins_to_win" })
    coinsToWin: number

    @Column({ type: "int", name: "xp_to_win" })
    xpToWin: number

    @Column()
    technology: string

    @Column({ type: "int", name: "tech_points_to_win" })
    techPointsToWin: number

    @Column({ nullable: true })
    stdin: string

    @Column({ name: "expected_output", nullable: true })
    expectedOutput: string

    @Column("simple-array", { name: "allowed_functions" })
    allowedFunctions: string[]

    @Column({ name: "image_instructions" })
    imageInstructions: string

    @ManyToOne(() => Project, project => project.exercises)
    project: Project

    @OneToMany(() => UserExercise, usersExercises => usersExercises.exercise)
    usersExercise: UserExercise[]
}
