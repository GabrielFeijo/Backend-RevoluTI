import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
