import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("tech_progress")
export class TechProgress {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: "int" })
    level: number

    @Column({ type: "int" })
    expPoints: number

    @Column({ type: "int" })
    expToUpgrade: number
}