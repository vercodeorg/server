
export class CreateExerciseDTO {
    name: string;
    coinsToWin: number;
    xpToWin: number;
    technologies: string[];
    turnInDirectory: string;
    filesToTurnIn: string[];
    allowedFunctions: string[];
    imageInstructions: string;
    projectId: number;
}