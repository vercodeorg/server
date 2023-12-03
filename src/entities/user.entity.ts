import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserBadges } from "./user-badges.entity";
import { UserEvents } from "./user-events.entity";
import { UserExercise } from "./user-exercise.entity";
import { UserLevel } from "./user-level.entity";
import { UserPoints } from "./user-points.entity";
import { UserProject } from "./user-project.entity";
import { UserTechProgress } from "./user-tech-progress.entity";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn("increment")
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column({ unique: true})
  email: string

  @Column({ default: 50, type: "int" })
  coins: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string

  @Column({ name: "xp_points", default: 0 })
  xpPoints: number

  @Column({ default: 1 })
  level: number

  @Column({ default: 100})
  xpToUpgrade: number

  @OneToMany(() => UserBadges, usersBadge => usersBadge.user)
  @JoinTable()
  usersBadges: UserBadges[]

  @OneToMany(() => UserProject, usersProject => usersProject.user)
  @JoinTable()
  usersProjects: UserProject[]

  @OneToMany(() => UserTechProgress, usersTechProgress => usersTechProgress.user)
  @JoinTable()
  usersTechProgress: UserTechProgress[]

  @OneToMany(() => UserLevel, usersLevels => usersLevels.user)
  @JoinTable()
  usersLevels: UserLevel[]

  @OneToMany(() => UserExercise, usersExercises => usersExercises.user)
  @JoinTable()
  usersExercises: UserExercise[]

  @OneToMany(() => UserEvents, usersEvents => usersEvents.user)
  @JoinTable()
  usersEvents: UserEvents[]

}
