import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { DishesRepository } from './dishes.repository';

@Injectable()
export class DishesService {
  constructor(private readonly dishesRepository: DishesRepository) {}

  create(createDishDto: CreateDishDto) {
    return this.dishesRepository.create(createDishDto);
  }

  findAll() {
    return this.dishesRepository.findAll();
  }

  findOne(id: number) {
    return this.dishesRepository.findOne(id);
  }
}
