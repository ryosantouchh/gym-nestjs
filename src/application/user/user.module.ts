import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserUseCaseModule } from './usecase/user-usecase.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@app/domain/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserUseCaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
