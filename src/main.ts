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
  ) => {
    return new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .build();
  };

  const versions = [
    {
      version: '1',
      path: 'v1/docs',
      title: 'API v1.0',
      description: 'Work with articles only',
      include: [V1AppModule],
    },
    {
      version: '2',
      path: 'v2/docs',
      title: 'API v2.0',
      description: 'Add work with users',
      include: [V2AppModule],
    },
  ];

  versions.forEach(({ version, path, title, description, include }) => {
    const config = createSwaggerConfig(version, title, description);

    const document = SwaggerModule.createDocument(app, config, {
      include: include,
      deepScanRoutes: true,
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        `${controllerKey}_${methodKey}`,
    });

    SwaggerModule.setup(`api/${path}`, app, document);
  });

  const mergedConfig = new DocumentBuilder()
    .setTitle('Multi-version API - Complete Documentation')
    .setDescription('Complete API documentation covering all versions')
    .setVersion('combined')
    .build();

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
