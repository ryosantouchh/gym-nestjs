import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'

@Controller('healthz')
export class HealthController {
  constructor(private healthhCheckService: HealthCheckService) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.healthhCheckService.check([])
  }
}
