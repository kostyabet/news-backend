import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { V1AppModule } from './api/v1.0/v1.module';
import { V2AppModule } from './api/v2.0/v2.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:24100', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  const createSwaggerConfig = (
    version: string,
    title: string,
    description: string,
    showAuth = false,
  ) => {
    const builder = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version);

    if (showAuth) {
      builder.addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      );
    }

    return builder.build();
  };

  const versions = [
    {
      version: '1',
      path: 'v1/docs',
      title: 'API v1.0',
      description: 'Work with articles only',
      include: [V1AppModule],
      auth: false,
    },
    {
      version: '2',
      path: 'v2/docs',
      title: 'API v2.0',
      description: 'Add work with users',
      include: [V2AppModule],
      auth: true,
    },
  ];

  versions.forEach(({ version, path, title, description, include, auth }) => {
    const config = createSwaggerConfig(version, title, description, auth);

    const document = SwaggerModule.createDocument(app, config, {
      include: include,
      deepScanRoutes: true,
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        `${controllerKey}_${methodKey}`,
    });

    SwaggerModule.setup(`api/${path}`, app, document);
  });

  const mergedConfig = createSwaggerConfig(
    'combined',
    'Multi-version API - Complete Documentation',
    'Complete API documentation covering all versions',
    true, // Включаем авторизацию здесь тоже
  );

  const mergedDocument = SwaggerModule.createDocument(app, mergedConfig, {
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api/docs', app, mergedDocument);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT || 3100);
}

bootstrap().catch(console.error);
