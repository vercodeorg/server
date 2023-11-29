import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

async function bootstrap() {
    if (process.env.NODE_ENV === 'production') {
        dotenv.config({ path: '.env.prod' });
    } else {
        dotenv.config()
    }
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(3000);
}
bootstrap();
