import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from '@app/domain/entities/user.entity'
import { CreateUserDto } from '@app/application/user/dto/create-user.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotModifiedException } from '@app/infrastructure/exception/not-modified.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find()

      if (users.length === 0) {
        throw new NotFoundException('users are not found!')
      }

      return users
    } catch (error) {
      throw error
    }
  }

  async findOneById(id: number): Promise<User> {
    try {
      const userById = await this.userRepository.findOneBy({ id })

      if (!userById) {
        throw new NotFoundException('user is not found!')
      }

      return userById
    } catch (error) {
      throw error
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto)

      return await this.userRepository.save(newUser)
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      const modifier = await this.userRepository.update({ id }, updateUserDto)

      if (!modifier.affected) {
        throw new NotModifiedException('no row affected!')
      }

      return
    } catch (error) {
      throw error
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const modifier = await this.userRepository.delete({ id })

      if (!modifier.affected) {
        throw new NotModifiedException('no row affected!')
      }

      return
    } catch (error) {
      throw error
    }
  }
}
