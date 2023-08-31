import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { UserLevel } from "./user-level.entity";

@Entity("levels")
export class Level {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({name: "unlock_cost", type: "int"})
    unlockCost: number

    @Column({name: "xp_required", type: "int"})
    xpRequired: number

    @OneToMany(() => Project, project => project.level)
    projects: Project[]

    @OneToMany(() => UserLevel, usersLevels => usersLevels.level)
    usersLevels: UserLevel[]
}