import { HttpException, Injectable } from '@nestjs/common';
import { Cars } from './cars.mock';
@Injectable()
export class CarService {
  private cars = Cars;

  public getCars() {
    return this.cars;
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === carId);
      if (!car) {
        throw new HttpException('Car Does not exist!', 404);
      }
      return resolve(car);
    }); 
  }
  public postCars(car) {
    return this.cars.push(car);
  }
  public deleteCarByID(id: number) :Promise<any>{
    const carId=Number(id);
    return new Promise(resolve=>{
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.cars.splice(index, 1);
      return resolve(this.cars);
    })
    
  }

  public putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const cardId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === cardId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.cars[index][propertyName] = propertyValue;
      return resolve(this.cars[index]);
    });
  }
}
