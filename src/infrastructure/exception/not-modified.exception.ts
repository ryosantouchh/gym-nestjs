import { HttpException, HttpStatus } from '@nestjs/common'

export class NotModifiedException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.NOT_MODIFIED)
  }
}
