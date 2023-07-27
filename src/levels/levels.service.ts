import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLevelDTO } from 'src/dtos/levels/createLevel.dto';
import { UpdateLevelDTO } from 'src/dtos/levels/updateLevel.dto';
import { Level } from 'src/entities/level.entity';
import { Status } from 'src/types/status';
import { Repository } from 'typeorm';

@Injectable()
export class LevelsService {

    constructor(
        @InjectRepository(Level)
        private levelsRepository: Repository<Level> 
    ){}

    create(createLevelDTO: CreateLevelDTO){
        const newLevel = this.levelsRepository.create(createLevelDTO)
        return this.levelsRepository.save(newLevel)
    }

    delete(id: number){
        return this.levelsRepository.delete(id)
    }

    update(id: number, updateLevelDTO: UpdateLevelDTO){
        return this.levelsRepository.update(id, updateLevelDTO)
    }

    async unlock(id: number, userCoins: number){
        try{
            const level = await this.levelsRepository.findOneBy({id: id})
            if(userCoins < level.unlockCost){
                throw new BadRequestException(HttpException, "User coins are insuficient")
            }
            await this.levelsRepository.update(level, {status: Status.IN_PROGRESS})
            return level
        }catch(e){
            throw new BadRequestException(e)
        }
    }

}
