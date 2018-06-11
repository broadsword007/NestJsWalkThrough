import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { CalculationsController } from './calculations.controller';
import { TodoDatabaseService } from './tododatabase.service';

@Module({
  imports: [],
  controllers: [TodosController,CalculationsController],
  providers: [TodoDatabaseService]
})
export class ManagementModule {}
