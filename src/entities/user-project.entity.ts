import { Status } from "src/types/status";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity("users_projects")
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "project_status",
    type: "enum",
    enum: Status,
    default: Status.BLOCKED,
  })
  projectStatus: Status;

  @Column({ name: "if_unlocked_with_coins", type: "boolean", default: false })
  ifUnlockedWithCoins: boolean;

  @ManyToOne(() => User, (user) => user.usersProjects)
  user: User;

  @ManyToOne(() => Project, (project) => project.usersProjects)
  project: Project;
}
