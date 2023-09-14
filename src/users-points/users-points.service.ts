import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPoints } from 'src/entities/user-points.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersPointsService {

    constructor(
        @InjectRepository(UserPoints)
        private usersPointsRepository: Repository<UserPoints>
    ){}
}
