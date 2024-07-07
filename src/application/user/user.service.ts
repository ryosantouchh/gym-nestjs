import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '@app/domain/entities/user.entity'
import { CreateUserDto } from './user.dto'
import { HttpResponse } from '@app/shared/dto/http-response.dto'

export interface IUserRepository {
  get(): HttpResponse<User[]>
}

@Injectable()
export class UserService implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get(): HttpResponse<User[]> {
    const mockUser1: User = { id: 1, firstName: 'John', lastName: 'Doe' }
    const mockUser2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' }
    const users = [mockUser1, mockUser2]
    const response = new HttpResponse<User[]>({
      statusCode: HttpStatus.OK,
      message: 'get user success',
      data: users,
    })
    return response
  }

  create(newUser: CreateUserDto): void {
    this.userRepository.save(newUser)
  }
}
