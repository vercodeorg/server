import { Body, Controller, Delete, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateLevelDTO } from 'src/dtos/levels/createLevel.dto';
import { UpdateLevelDTO } from 'src/dtos/levels/updateLevel.dto';
import { LevelsService } from './levels.service';

@Controller('levels')
export class LevelsController {

    constructor(
        private levelsService: LevelsService
    ){}

    @Post()
    createLevel(@Body() createLevelDTO: CreateLevelDTO){
        this.levelsService.create(createLevelDTO)
    }

    @Delete(':id')
    deleteLevel(@Param('id') id: number){
        this.levelsService.delete(id)
    }

    @Put(':id')
    updateLevel(@Param('id') id: number, @Body() updateLevelDTO: UpdateLevelDTO){
        this.levelsService.update(id, updateLevelDTO)
    }

    @Patch('unlock/:id')
    async unlockLevel(@Param('id') id: number){
        return await this.levelsService.unlock(id)
    }
}
