import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Badge } from "./badge.entity";
import { TechProgress } from "./techProgress.entity";
import { UserExercise } from "./user-exercise.entity";
import { UserLevel } from "./user-level.entity";
import { UserProject } from "./user-project.entity";
import { UserEvents } from "./user-events.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

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

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string

    @ManyToMany(() => Badge)
    @JoinTable()
    badges: Badge[]

    @OneToMany(() => UserProject, usersProject => usersProject.user)
    @JoinTable()
    usersProjects: UserProject[]

    @OneToMany(() => UserLevel, usersLevels => usersLevels.user)
    @JoinTable()
    usersLevels: UserLevel[]

    @OneToMany(() => UserExercise, usersExercises => usersExercises.user)
    @JoinTable()
    usersExercises: UserExercise[]
    
    @OneToMany(() => UserEvents, usersEvents => usersEvents.user)
    @JoinTable()
    usersEvents: UserEvents[]

    @ManyToMany(() => TechProgress)
    @JoinTable()
    techProgress: TechProgress[]
    
}