import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { CarService } from './car.service';


@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars(){
      return this.carService.getCars();
  }

  @Post()
  public postcar(@Body() car: CarDto){
    return this.carService.postCars(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id:number){
    return this.carService.getCarById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id:number){
    return this.carService.deleteCarById(id);
  }

  @Put(':id')
  public async put(@Param('id') id,@Query() query) {
    const propertyName=query.property_name;
    const propertyValue=query.property_value;
    return this.carService.putCarById(id,propertyName,propertyValue);
  }
}

