import { Technology } from "src/types/technology";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity("exercises")
export class Exercise {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column({type: "int", name: "coins_to_win"})
    coinsToWin: number
    
    @Column({type: "int", name: "xp_to_win"})
    xpToWin: number
    
    @Column({type: "enum", enum: Technology, array: true})
    technologies: Technology[]

    @Column()
    instructions: string
    
    @Column({name: "code_result"})
    codeResult: string

    @ManyToOne(() => Project, project => project.exercises)
    project: Project
}