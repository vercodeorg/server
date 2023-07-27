import { Status } from "src/types/status"

export class CreateLevelDTO {
    name: string
    status: Status
    unlockCost: number
}