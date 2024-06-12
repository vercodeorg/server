import { Status } from "src/types/status";

export class UpdateLevelDTO {
  name: string;
  status: Status;
  unlockCost: number;
}
