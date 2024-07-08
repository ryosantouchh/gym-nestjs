// import { Injectable, NestMiddleware } from '@nestjs/common'
// import { NextFunction, Request, Response } from 'express'
// import { ShutdownService } from './shutdown.service'
//
// @Injectable()
// export class BlockRequestMiddleware implements NestMiddleware {
//   constructor(private readonly shutdownService: ShutdownService) {}
//
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('test')
//     if (this.shutdownService.isShuttingDown) {
//       console.log('Request blocked during shutdown.')
//       return res.status(503).send('Service unavailable (shutting down)')
//     }
//
//     next() // Continue with request handling if not shutting down
//   }
// }

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ShutdownService } from './shutdown.service' // Assuming shutdown.service is in the same directory

@Injectable()
export class BlockRequestInterceptor implements NestInterceptor {
  constructor(private readonly shutdownService: ShutdownService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.shutdownService.isShuttingDown) {
      console.log('Request blocked during shutdown.')
      return next.handle().pipe(
        tap(() => {
          throw new ForbiddenException('Service unavailable (shutting down)')
        }),
      )
    }

    return next.handle()
  }
}
