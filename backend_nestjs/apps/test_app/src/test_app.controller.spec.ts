import { Test, TestingModule } from '@nestjs/testing';
import { TestAppController } from './test_app.controller';
import { TestAppService } from './test_app.service';

describe('TestAppController', () => {
  let testAppController: TestAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestAppController],
      providers: [TestAppService],
    }).compile();

    testAppController = app.get<TestAppController>(TestAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(testAppController.getHello()).toBe('Hello World!');
    });
  });
});
