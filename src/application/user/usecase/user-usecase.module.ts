import { Module } from '@nestjs/common'
import { GetUserUseCase } from './get-user'
import { UserService } from '../user.service'
import { CreateUserUseCase } from './create-user'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@app/domain/user/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    // need to use service as a provider across usecase module
    UserService,
    GetUserUseCase,
    CreateUserUseCase,
  ],
  exports: [GetUserUseCase, CreateUserUseCase],
})
export class UserUseCaseModule {}
