import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("badges")
export class Badge {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @ManyToOne(() => User, (user) => user.badges)
    user: User
}