import { Difficulty } from "src/types/difficulty"
import { Status } from "src/types/status"

export class CreateProjectDTO {
    name: string
    status: Status
    difficulty: Difficulty
    unlockCost: number
}