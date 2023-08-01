import { Difficulty } from "src/types/difficulty";
import { Status } from "src/types/status";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise.entity";
import { Level } from "./level.entity";

@Entity("projects")
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({type: "enum", enum: Status, default: Status.BLOCKED})
    status: Status
    
    @Column({type: "enum", enum: Difficulty})
    difficulty: Difficulty

    @Column({name: "unlock_cost", type: "int"})
    unlockCost: number

    @ManyToOne(() => Level, level => level.projects)
    level: Level

    @OneToMany(() => Exercise, exercise => exercise.project)
    exercises: Exercise[]
 
}