import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEvents } from 'src/entities/user-events.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersEventsService {

    constructor(
        @InjectRepository(UserEvents)
        private usersEventsRepository: Repository<UserEvents>
    ){}
}
