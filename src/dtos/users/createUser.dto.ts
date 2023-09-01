import { Level } from "src/entities/level.entity"

export class CreateUserDTO {
    username: string
    password: string
    levels: Level[]
}