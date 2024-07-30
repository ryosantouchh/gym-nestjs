import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { User } from '@app/domain/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.hostname'),
        port: configService.get<number>('database.databasePort'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.databaseName'),
        entities: [User],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
