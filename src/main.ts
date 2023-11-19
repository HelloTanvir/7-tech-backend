import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'https://www.seventech.com.bd',
            'www.seventech.com.bd',
            'https://seventech.com.bd',
            'seventech.com.bd',
            'https://7tech.vercel.app',
            '7tech.vercel.app',
            'http://localhost:3000',
            'localhost:3000',
            'www.localhost:3000',
            'www.7tech.vercel.app',
        ],
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const options = new DocumentBuilder()
        .setTitle('Seven-Tech APIs')
        .setDescription('All the APIs are documented here')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.PORT || 5000);
}
bootstrap();
