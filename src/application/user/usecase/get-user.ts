import { Injectable } from '@nestjs/common'
import { UserService } from '../user.service'

@Injectable()
export class GetUserUseCase {
  constructor(private userService: UserService) {  }

  async execute() {
    return await this.userService.findAll()
  }
}
