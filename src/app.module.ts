import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BadgesModule } from './badges/badges.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: "pedrohsj.dev",
      password: "14863421amw",
      database: "vercode_db",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    BadgesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
