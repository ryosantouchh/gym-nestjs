import type { Response, Request } from 'express'

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger()
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    console.log('method :', request.method)

    this.logger.error(`Unhandled exception (${status}): ${exception.message}`, {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      cause: exception.cause,
    })

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Unhandled Internal Server Error',
    }

    response.status(status).json(errorResponse)
  }
}
