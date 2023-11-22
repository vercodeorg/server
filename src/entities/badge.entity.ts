import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from "typeorm";
import { UserBadges } from "./user-badges.entity";

@Entity("badges")
export class Badge {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column({name: 'image_url'})
    imageUrl: string

    @OneToMany(() => UserBadges, usersBadge => usersBadge.badge)
    @JoinTable()
    usersBadges: UserBadges[]

}