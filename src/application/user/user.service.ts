import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '@app/domain/user/user.entity'
import { CreateUserDto } from './user.dto'

export interface IUserRepository {
  get(): User[]
}

@Injectable()
export class UserService implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get(): User[] {
    const mockUser1: User = { id: 1, firstName: 'John', lastName: 'Doe' }
    const mockUser2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' }
    const users = [mockUser1, mockUser2]
    return users
  }

  create(newUser: CreateUserDto): void {
    this.userRepository.save(newUser)
  }
}
