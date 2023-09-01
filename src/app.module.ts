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
import { UsersProjectsModule } from './users-projects/users-projects.module';
import { UsersLevelsModule } from './users-levels/users-levels.module';
import { UsersExercisesModule } from './users-exercises/users-exercises.module';
import { UsersEventsModule } from './users-events/users-events.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: "pedrohsj.dev",
      password: "4734amw704",
      database: "vercode_db",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    BadgesModule,
    LevelsModule,
    ProjectsModule,
    TechProgressModule,
    ExercisesModule,
    UsersProjectsModule,
    UsersLevelsModule,
    UsersExercisesModule,
    UsersEventsModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
