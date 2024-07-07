import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export class TypeOrmConfig {
  private config: TypeOrmModuleOptions

  getDbConfig(environment = 'development'): TypeOrmModuleOptions {
    this.config = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your_password',
      database:
        environment === 'production' ? 'gym_sample_db' : 'gym_sample_db',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: false, // WARN : Don't change it , this line is so dangerous in production
    }

    return this.config
  }
}