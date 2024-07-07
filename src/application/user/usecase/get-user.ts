import { Injectable } from '@nestjs/common'
import { UserService } from '../user.service'

@Injectable()
export class GetUserUseCase {
  constructor(private userService: UserService) {}

  execute() {
    // implement business logic
    return this.userService.get()
  }
}
