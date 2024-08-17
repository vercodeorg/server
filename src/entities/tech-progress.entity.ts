import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserTechProgress } from "./user-tech-progress.entity";

@Entity("tech_progress")
export class TechProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "int", default: 0 })
  level: number;

  @Column({ type: "int" })
  xpToUpgrade: number;

  @OneToMany(
    () => UserTechProgress,
    (usersTechProgress) => usersTechProgress.user
  )
  @JoinTable()
  usersTechProgress: UserTechProgress[];
}
