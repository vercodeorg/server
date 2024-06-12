import { HttpService } from "@nestjs/axios";
import { HttpStatus, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { ExerciseSubmission } from "src/entities/exercise-submission.entity";
import { Exercise } from "src/entities/exercise.entity";
import { UserExercise } from "src/entities/user-exercise.entity";
import { User } from "src/entities/user.entity";
import { ExerciseStatus } from "src/types/exerciseStatus";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class UsersExercisesService {
  constructor(
    @InjectRepository(UserExercise)
    private usersExercisesRepository: Repository<UserExercise>,
    @InjectRepository(ExerciseSubmission)
    private exercisesSubmissionsRepository: Repository<ExerciseSubmission>,
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private readonly httpService: HttpService
  ) {}

  async addToNewUserInitalExercises(user: User) {
    try {
      const exercises = await this.exercisesRepository.find();
      exercises.map((ex) => {
        const newUserExercise = this.usersExercisesRepository.create();
        newUserExercise.exercise = ex;
        newUserExercise.user = user;
        this.usersExercisesRepository.save(newUserExercise);
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async submitExercise(id: number, codeResult: { code: string }) {
    const userExercise = await this.usersExercisesRepository.findOne({
      where: { id: id },
      relations: {
        exercise: true,
        user: true,
      },
    });

    const token = await this.compileCodeOnJudgeService(
      codeResult.code,
      userExercise.exercise.stdin,
      userExercise.exercise.expectedOutput
    );
    const newExerciseSubmission = this.exercisesSubmissionsRepository.create();
    newExerciseSubmission.userExercise = userExercise;
    newExerciseSubmission.codeResult = codeResult.code;
    newExerciseSubmission.token = token;
    await this.exercisesSubmissionsRepository.save(newExerciseSubmission);

    const result = await this.correctExercise(token, userExercise);
    if (result.success) {
      await this.usersExercisesRepository.update(id, {
        exerciseStatus: ExerciseStatus.SUCCESSFUL,
      });
    } else {
      await this.usersExercisesRepository.update(id, {
        exerciseStatus: ExerciseStatus.FAILED,
      });
    }
    return result;
  }

  async compileCodeOnJudgeService(
    codeResult: string,
    stdin: string,
    expectedOutput: string
  ) {
    const judgeApiUrl = process.env.JUDGE_API_SERVICE;
    const response = await firstValueFrom(
      this.httpService.post(
        judgeApiUrl + "/submissions/?base64_encoded=false&wait=false",
        {
          source_code: codeResult,
          language_id: 50,
          stdin: stdin,
          expected_output: expectedOutput,
        }
      )
    );
    if (response.status === HttpStatus.CREATED) {
      return response.data?.token;
    }
  }

  async correctExercise(token: string, userExercise: UserExercise) {
    const judgeApiUrl = process.env.JUDGE_API_SERVICE;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await lastValueFrom(
      this.httpService.get(
        `${judgeApiUrl}/submissions/${token}?base64_encoded=false&wait=false`
      )
    );
    console.log("exercicio corrigido", response.data);
    if (response.status === HttpStatus.OK) {
      if (response.data.status.description === "Accepted") {
        await this.usersService.updateXpPoints(userExercise);
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    }
  }
}
