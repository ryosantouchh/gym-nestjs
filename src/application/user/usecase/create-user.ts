import { Injectable } from '@nestjs/common'
import { UserService } from '../user.service'
import { CreateUserDto } from '../user.dto'

@Injectable()
export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  execute(newUser: CreateUserDto) {
    // implement business logic
    return this.userService.create(newUser)
  }
}
