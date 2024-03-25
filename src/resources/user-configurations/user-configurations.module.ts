import { Module } from '@nestjs/common';
import { UserConfigurationsService } from './user-configurations.service';
import { UserConfigurationsController } from './user-configurations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConfiguration } from './entities/user-configuration.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserConfiguration]) ],
  controllers: [UserConfigurationsController],
  providers: [UserConfigurationsService],
})
export class UserConfigurationsModule {}
