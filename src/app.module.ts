import { Module } from '@nestjs/common';
import { V1AppModule } from './api/v1.0/v1.module';
import { ConfigModule } from '@nestjs/config';
import { V2AppModule } from './api/v2.0/v2.module';

@Module({
  imports: [ConfigModule.forRoot(), V1AppModule, V2AppModule],
})
export class AppModule {}
