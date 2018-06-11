import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CalculationsController } from '../calculations.controller';

describe('TodosController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CalculationsController]
    }).compile();
  });

  describe('3*2', () => {
    it('should return 6', () => {
      const appController = app.get<CalculationsController>(CalculationsController);
      //expect(appController.root()).toBe('Hello World!');
      var ans = 7
      expect(appController.multiplyNumbers({num1: 2, num2: 3})).toBe(ans.toString())
    });
  });
});
