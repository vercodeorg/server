import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Badge } from "./badge.entity";
import { TechProgress } from "./techProgress.entity";
import { Level } from "./level.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({default: 0, type: "int"})
    coins: number

    @Column({name: "exp_points", default: 0, type: "int"})
    expPoints: number

    @CreateDateColumn({name: 'created_at'})
    createdAt: string

    @ManyToMany(() => Badge)
    @JoinTable()
    badges: Badge[]

    @ManyToMany(() => TechProgress)
    @JoinTable()
    techProgress: TechProgress[]
    
    @ManyToMany(() => Level)
    @JoinTable()
    levels: Level[]
    
}