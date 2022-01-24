import { HttpException, Injectable } from '@nestjs/common';
import { Cars } from './cars.mock'; // does n't mock data beacuse mongoose jmported
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './dto/car.dto';


@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

  public getCars(): Promise<CarDto[]> {
    const cars = this.carModel.find().exec();
    if (!cars || cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public async getCarById(id: number): Promise<CarDto> {
    const car = await this.carModel.findOne({ id }).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
  public async postCars(newCar: CarDto) {
    const car = await new this.carModel(newCar);
    return car.save(); //save data at mongoose
  }
  public async deleteCarById(id: number) {
    const car = await this.carModel.deleteOne({ id }).exec();
    if (car.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    console.log(car);
    return car;
  }

  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const car = await this.carModel
      .findOneAndUpdate(
        { id },
        {
          [propertyName]: propertyValue,
        },
      )
      .exec();
    return car;
  }
}
