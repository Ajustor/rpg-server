import { SecurityLayerInterceptor } from '@/security-layer.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (config.get('USE_SECURITY')) {
    app.useGlobalInterceptors(new SecurityLayerInterceptor())
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  app.startAllMicroservices()

  await app.listen(config.get('PORT'))

  console.log(`Server running on port ${config.get('PORT')}`)
}
bootstrap()
