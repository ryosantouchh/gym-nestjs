import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class ShutdownService implements OnModuleInit, OnModuleDestroy {
  private readonly signals: NodeJS.Signals[] = [
    'SIGINT', // Interrupt (Ctrl+C)
    'SIGTERM', // Termination (kill)
  ]
  private readonly dataSource: DataSource
  public isShuttingDown: boolean = false

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }

  async onModuleInit() {
    for (const signal of this.signals) {
      process.on(signal, async () => {
        this.isShuttingDown = true
        console.log(`Received signal: ${signal}`)
        await this.handleShutdown()
        process.exit(0) // Exit process cleanly after shutdown tasks
      })
    }
  }

  async handleShutdown() {
    // Add your custom shutdown logic here
    // e.g., disconnect from databases, close file handles, notify clients
    console.log('Blocking incoming requests...')
    console.log('Performing graceful shutdown tasks...')
    // Replace with your specific actions
    await Promise.all([
      // Add tasks to be completed before exiting
      // This could involve database disconnection, cleanup, etc.
    ])

    if (this.dataSource.isInitialized) {
      console.log('Closing TypeOrm connection...')

      // Delay before destroy datasource connection
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await this.dataSource.destroy()
    }
    console.log('Graceful shutdown complete.')
  }

  async onModuleDestroy() {
    // Optional: Perform any additional cleanup tasks here
  }
}
