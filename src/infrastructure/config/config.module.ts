import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./env/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class ConfigurationModule {}
