import { Status } from "src/types/status";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Level } from "./level.entity";

@Entity("users_levels")
export class UserLevel {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum: Status, default: Status.BLOCKED})
    status: Status

    @ManyToOne(() => User, user => user.usersLevels)
    user: User

    @ManyToOne(() => Level, level => level.usersLevels)
    level: Level
}