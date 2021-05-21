import { RentController } from './rent.controller';
import { PassportModule } from '@nestjs/passport';
import { rentProviders } from './rent.providers';
import { RentMapper } from './dto/rent.mapper';
import { RentService } from './rent.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ 
    PassportModule.register({defaultStrategy: "jwt"}),
  ],
  controllers: [RentController],
  providers: [RentService, ...rentProviders, RentMapper],
  exports:[RentService]
})
export class RentModule {}
