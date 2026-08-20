import { Controller, Get } from '@nestjs/common';
import { TestAppService } from './test_app.service';

@Controller()
export class TestAppController {
  constructor(private readonly testAppService: TestAppService) {}

  @Get()
  getHello(): string {
    return this.testAppService.getHello();
  }
}
