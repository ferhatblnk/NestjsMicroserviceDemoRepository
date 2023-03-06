import { Injectable, Logger } from '@nestjs/common';
import { BillingRepository } from './billing.repository';

@Injectable()
export class BillingService {
  constructor(private readonly billingRepository: BillingRepository) {}
  private readonly logger = new Logger(BillingService.name);

  async getBilling() {
    return this.billingRepository.find({});
  }

  bill(data: any) {
    this.logger.log('Billing...', data);
  }
  getHello(): string {
    return 'Hello World';
  }
}
