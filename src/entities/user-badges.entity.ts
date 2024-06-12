import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Badge } from "./badge.entity";
import { User } from "./user.entity";

@Entity("users_badges")
export class UserBadges {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({ name: "achievement_date" })
  achievementDate: string;

  @ManyToOne(() => User, (user) => user.usersBadges)
  user: User;

  @ManyToOne(() => Badge, (badge) => badge.usersBadges)
  badge: Badge;
}
