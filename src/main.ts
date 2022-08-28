import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const options = new DocumentBuilder()
        .setTitle('Seven-Tech APIs')
        .setDescription('All the APIs are documented here')
        .setVersion('1.0.0')
        .addTag('api-doc')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 5000);
}
bootstrap();
