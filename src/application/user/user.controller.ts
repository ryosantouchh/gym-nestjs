import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { GetUserUseCase } from './usecase/get-user'
import { CreateUserUseCase } from './usecase/create-user'
import { CreateUserDto } from './dto/create-user.dto'
import {
  BaseHttpResponse,
  HttpResponse,
} from '@app/shared/dto/http-response.dto'
import { User } from '@app/domain/entities/user.entity'
import { GetUserByIdUseCase } from './usecase/get-user-by-id'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateUserUseCase } from './usecase/update-user'
import { DeleteUserUseCase } from './usecase/delete-user'

@Controller('user')
export class UserController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  async findAll() {
    const users = await this.getUserUseCase.execute()

    return new HttpResponse<User[]>({
      statusCode: HttpStatus.OK,
      message: 'get users success!',
      data: users,
    })
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(parseInt(id))

    return new HttpResponse<User>({
      statusCode: HttpStatus.OK,
      message: 'get user by id success!',
      data: user,
    })
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.createUserUseCase.execute(createUserDto)

    return new BaseHttpResponse({
      statusCode: HttpStatus.CREATED,
      message: 'create user success!',
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.updateUserUseCase.execute(parseInt(id), updateUserDto)

    return new BaseHttpResponse({
      statusCode: HttpStatus.OK,
      message: 'update user by id success!',
    })
  }

  @Delete('id')
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(parseInt(id))

    return new BaseHttpResponse({
      statusCode: HttpStatus.OK,
      message: 'delete user by id success!',
    })
  }
}
