import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    CarModule,
    MongooseModule.forRoot('mongodb://localhost:27017/car_manager')
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
