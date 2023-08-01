import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadgesModule } from './badges/badges.module';
import { ExercisesModule } from './exercises/exercises.module';
import { LevelsModule } from './levels/levels.module';
import { ProjectsModule } from './projects/projects.module';
import { TechProgressModule } from './tech-progress/tech-progress.module';
import { UsersModule } from './users/users.module';

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
    BadgesModule,
    LevelsModule,
    ProjectsModule,
    TechProgressModule,
    ExercisesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
