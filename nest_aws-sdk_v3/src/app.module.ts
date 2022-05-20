import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ImageModule,
  ],
})
export class AppModule {}
