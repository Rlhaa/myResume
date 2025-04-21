import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsService],
  exports: [AwsService], // 외부에서도 사용 가능하도록
})
export class AwsModule {}
