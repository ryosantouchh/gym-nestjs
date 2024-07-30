import { Injectable } from '@nestjs/common'
import { UserService } from '../user.service'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UpdateUserUseCase {
  constructor(private userService: UserService) {}

  async execute(id: number, updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto)
  }
}
