import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TechProgress } from "./techProgress.entity";
import { UserBadges } from "./user-badges.entity";
import { UserEvents } from "./user-events.entity";
import { UserExercise } from "./user-exercise.entity";
import { UserLevel } from "./user-level.entity";
import { UserPoints } from "./user-points.entity";
import { UserProject } from "./user-project.entity";

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

    @CreateDateColumn({name: 'created_at'})
    createdAt: string

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string

    @OneToMany(() => UserBadges, usersBadge => usersBadge.user)
    @JoinTable()
    usersBadges: UserBadges[]

    @OneToMany(() => UserProject, usersProject => usersProject.user)
    @JoinTable()
    usersProjects: UserProject[]

    @OneToMany(() => UserPoints, userPoints => userPoints.user)
    @JoinTable()
    usersPoints: UserPoints[]

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