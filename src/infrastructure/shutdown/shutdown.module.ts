import { Module } from '@nestjs/common'
import { ShutdownService } from './shutdown.service'
import { BlockRequestInterceptor } from './block-request.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  providers: [
    ShutdownService,
    { provide: APP_INTERCEPTOR, useClass: BlockRequestInterceptor },
  ],
  exports: [ShutdownService],
})
export class ShutdownModule {}
