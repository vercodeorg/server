import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { RankProgress } from "./rank-progress.entity";

@Entity('users_points')
export class UserPoints{

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'user_current_points', default: 0, type: "int"})
    userCurrentPoints: number

    @ManyToOne(() => User, user => user.usersPoints)
    user: User

    @ManyToOne(() => RankProgress, rankProgress => rankProgress.usersPoints)
    rankProgress: RankProgress
}