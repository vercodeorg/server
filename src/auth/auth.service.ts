import { BadRequestException, Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new BadRequestException("User not found!")
            }
            const passMatch = await comparePassword(pass, user.password);
            if (passMatch) {
                console.log('User validation Success!')
                const {password, ...result} = user;
                return result;
            } else {
                console.log('Passwords do not Match')
                return null
            }
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
