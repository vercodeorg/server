import { Status } from "src/types/status";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity("levels")
export class Level {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({type: "enum", enum: Status, default: Status.BLOCKED})
    status: Status

    @Column({name: "unlock_cost", type: "int"})
    unlockCost: number

    @OneToMany(() => Project, project => project.level)
    projects: Project[]
}