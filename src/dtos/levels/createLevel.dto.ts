import { Status } from "src/types/status";

export class CreateLevelDTO {
  name: string;
  status: Status;
  unlockCost: number;
}

export const CreateLevel = [
  {
    name: "00 - Fundamentals and Instructions",
    stauts: Status.BLOCKED,
    unlockCost: 0,
  },
  {
    name: "01 - First steps in C",
    stauts: Status.BLOCKED,
    unlockCost: 300,
  },
  {
    name: "02 - Improving coding skills",
    stauts: Status.BLOCKED,
    unlockCost: 750,
  },
];
