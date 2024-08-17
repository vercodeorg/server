import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

@Entity("users_events")
export class UserEvents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "coins_received", type: "int" })
  coinsReceived: number;

  @Column({ name: "xp_received", type: "int" })
  xpReceived: number;

  @Column({ type: "date" })
  date: string;

  @ManyToOne(() => User, (user) => user.usersEvents)
  user: User;

  @ManyToOne(() => Event, (event) => event.usersEvents)
  event: Event;
}
