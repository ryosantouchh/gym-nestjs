import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { GetUserUseCase } from './usecase/get-user'
import { CreateUserUseCase } from './usecase/create-user'
import { CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Get()
  get() {
    return this.getUserUseCase.execute()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto)
  }
}
