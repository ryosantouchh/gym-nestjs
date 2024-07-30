import { Module } from '@nestjs/common'
import { UserModule } from '@app/application/user/user.module'
import { DatabaseModule } from '@app/infrastructure/persistence/database/database.module'
import { DataSource } from 'typeorm'
import { ShutdownModule } from './infrastructure/shutdown/shutdown.module'
import { ConfigurationModule } from './infrastructure/config/config.module'

@Module({
  imports: [DatabaseModule, UserModule, ShutdownModule, ConfigurationModule],
})
export class AppModule {
  constructor(private datasource: DataSource) {  }
}
