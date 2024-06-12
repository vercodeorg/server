import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEvents } from "./user-events.entity";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => UserEvents, (usersEvents) => usersEvents.event)
  @JoinTable()
  usersEvents: UserEvents[];
}
