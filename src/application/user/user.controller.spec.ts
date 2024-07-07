import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@app/domain/entities/user.entity'
import { GetUserUseCase } from './usecase/get-user'
import { UserController } from './user.controller'
import {
  BaseHttpResponse,
  HttpResponse,
} from '@app/shared/dto/http-response.dto'
import { CreateUserUseCase } from './usecase/create-user'
import { CreateUserDto } from './user.dto'

describe('UserController', () => {
  let getUserUseCase: GetUserUseCase
  let createUserUseCase: CreateUserUseCase
  let userController: UserController

  beforeEach(async () => {
    jest.mock('@app/application/user/user.service')

    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [],
    })
      .useMocker((functionType) => {
        switch (functionType) {
          case GetUserUseCase:
            const firstUser: User = {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
            }
            const secondUser: User = {
              id: 2,
              firstName: 'Jane',
              lastName: 'Doe',
            }
            const users = [firstUser, secondUser]
            return { execute: jest.fn().mockResolvedValue(users) }
          case CreateUserUseCase:
            const httpRes = new BaseHttpResponse({
              statusCode: HttpStatus.CREATED,
              message: 'create user success',
            })
            return { execute: jest.fn().mockResolvedValue(httpRes) }
        }
      })
      .compile()

    userController = module.get<UserController>(UserController)
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase)
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase)
  })

  describe('get', () => {
    it('should return an array of users', () => {
      const firstUser: User = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      }
      const secondUser: User = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
      }
      const users = [firstUser, secondUser]
      const result = new HttpResponse<User[]>({
        statusCode: HttpStatus.OK,
        message: 'get user success',
        data: users,
      })

      jest.spyOn(getUserUseCase, 'execute').mockImplementation(() => result)
      const actualResult = userController.get()

      expect(actualResult).toEqual(result)
    })
  })

  describe('create', () => {
    it('should create user success', () => {
      const result = new BaseHttpResponse({
        statusCode: HttpStatus.CREATED,
        message: 'create user success',
      })
      const firstUser: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
      }
      jest.spyOn(createUserUseCase, 'execute').mockImplementation(() => result)
      const actualResult = userController.create(firstUser)

      expect(actualResult).toEqual(result)
    })
  })
})
