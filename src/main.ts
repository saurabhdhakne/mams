import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  VersioningType,
  ValidationPipe,
  ValidationError,
  INestApplication,
} from '@nestjs/common';
import { ValidationFilter } from './exceptions/validation.filter';
import { ValidationException } from './exceptions/validation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') ?? '*',
    preflightContinue: false,
    maxAge: 300,
  });
  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (err) => `${err.property} has wrong value ${err.value}`,
        );
        return new ValidationException(messages);
      },
    }),
  );
  await attachOpenAPIDocumentation(app);
  await app.listen(process.env.PORT ? process.env.PORT : 4000);
}

async function attachOpenAPIDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
