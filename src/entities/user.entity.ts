import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Badge } from "./badge.entity";

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

    @OneToMany(() => Badge, (badge) => badge.user)
    badges: Badge[]
}