import { Module } from '@nestjs/common'
import { UserModule } from '@app/application/user/user.module'
import { DatabaseModule } from '@app/infrastructure/persistence/database/database.module'
import { DataSource } from 'typeorm'

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}