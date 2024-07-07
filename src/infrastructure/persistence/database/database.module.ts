import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfig } from './database.config'

@Module({
  imports: [TypeOrmModule.forRoot(new TypeOrmConfig().getDbConfig())],
})
export class DatabaseModule {}
