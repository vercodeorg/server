import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("badges")
export class Badge {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

}