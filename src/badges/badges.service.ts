import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from 'src/entities/badge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BadgesService {

    constructor(
        @InjectRepository(Badge)
        private badgesRepository: Repository<Badge>
    ){}

    async findOne(id: number){
        return this.badgesRepository.findOne({
            where: {
                id: id
            }
        })
    }

    
}
