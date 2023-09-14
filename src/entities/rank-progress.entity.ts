import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPoints } from "./user-points.entity";


@Entity('rank_progress')
export class RankProgress{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    level: number

    @Column({name: 'required_xp_to_update', type: 'int'})
    requiredXpToUpdate: number

    @OneToMany(() => UserPoints, usersPoints => usersPoints.rankProgress)
    @JoinTable()
    usersPoints: UserPoints[]

}