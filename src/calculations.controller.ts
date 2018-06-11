import { Get, Controller, Post, Patch, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoDatabaseService } from './tododatabase.service';

@Controller('calculations')
export class CalculationsController {
  constructor() {}

  @Post('/multiply')      //-- get a specific todo
  multiplyNumbers(@Body() params): string {
    return (params.num1*params.num2).toString()
  }
}
