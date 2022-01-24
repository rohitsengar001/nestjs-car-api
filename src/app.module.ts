import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';

@Module({
  imports: [CarModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
