import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TechProgress } from "./tech-progress.entity";
import { User } from "./user.entity";

@Entity("users_tech_progress")
export class UserTechProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "xp_points", default: 0 })
  xpPoints: number;

  @ManyToOne(() => User, (user) => user.usersTechProgress)
  user: User;

  @ManyToOne(
    () => TechProgress,
    (techProgress) => techProgress.usersTechProgress
  )
  techProgress: TechProgress;
}
