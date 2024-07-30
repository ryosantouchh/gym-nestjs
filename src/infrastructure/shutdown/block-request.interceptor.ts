import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ServiceUnavailableException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ShutdownService } from './shutdown.service'

@Injectable()
export class BlockRequestInterceptor implements NestInterceptor {
  constructor(private readonly shutdownService: ShutdownService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.shutdownService.isShuttingDown) {
      console.log('Request blocked during shutdown.')
      return next.handle().pipe(
        tap(() => {
          throw new ServiceUnavailableException(
            'Service unavailable (shutting down)',
          )
        }),
      )
    }

    return next.handle()
  }
}
