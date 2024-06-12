import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { RankProgress } from "./rank-progress.entity";

@Entity("users_points")
export class UserPoints {
  @PrimaryGeneratedColumn()
  id: number;
}
