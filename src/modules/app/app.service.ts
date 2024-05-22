import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! test';
  }

  testMethod(): string {
    return 'This is test';
  }
}
