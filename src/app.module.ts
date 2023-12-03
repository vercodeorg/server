import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadgesModule } from './badges/badges.module';
import { EventsModule } from './events/events.module';
import { ExercisesModule } from './exercises/exercises.module';
import { LevelsModule } from './levels/levels.module';
import { ProjectsModule } from './projects/projects.module';
import { RankProgressModule } from './rank-progress/rank-progress.module';
import { TechProgressModule } from './tech-progress/tech-progress.module';
import { UsersBadgeModule } from './users-badge/users-badge.module';
import { UsersEventsModule } from './users-events/users-events.module';
import { UsersExercisesModule } from './users-exercises/users-exercises.module';
import { UsersLevelsModule } from './users-levels/users-levels.module';
import { UsersPointsModule } from './users-points/users-points.module';
import { UsersProjectsModule } from './users-projects/users-projects.module';
import { UsersTechProgressModule } from './users-tech-progress/users-tech-progress.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesSubmissionsModule } from './exercises-submissions/exercises-submissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,

    BadgesModule,
    LevelsModule,
    ProjectsModule,
    TechProgressModule,
    ExercisesModule,
    UsersProjectsModule,
    UsersLevelsModule,
    // UsersExercisesModule,
    UsersEventsModule,
    EventsModule,
    RankProgressModule,
    //UsersPointsModule,
    UsersBadgeModule,
    UsersTechProgressModule,
    ExercisesSubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
