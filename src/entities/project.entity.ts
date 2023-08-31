import { Difficulty } from "src/types/difficulty";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise.entity";
import { Level } from "./level.entity";
import { UserProject } from "./user-project.entity";

@Entity("projects")
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column({type: "enum", enum: Difficulty})
    difficulty: Difficulty

    @Column({name: "unlock_cost", type: "int"})
    unlockCost: number

    @ManyToOne(() => Level, level => level.projects)
    level: Level

    @OneToMany(() => Exercise, exercise => exercise.project)
    exercises: Exercise[]

    @OneToMany(() => UserProject, usersProject => usersProject.user)
    usersProjects: UserProject
}