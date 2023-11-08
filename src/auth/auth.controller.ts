import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from 'src/dtos/auth/signIn.dto';
import { CreateUserDTO } from 'src/dtos/users/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    singIn(@Body() signInDTO: SignInDTO, @Request() req) {
        return this.authService.login(req.user)
    }

    @UsePipes(ValidationPipe)
    @Post('register')
    async signUp(@Body() createUserDTO: CreateUserDTO) {
        try {
            await this.usersService.create(createUserDTO)
        } catch (error) {
            throw new BadRequestException("Unable to create user", error)
        }
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}
