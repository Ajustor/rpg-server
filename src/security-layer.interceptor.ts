import { SecurityLayer } from '@/config/SecurityLayer'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common'
import { KeyLike } from 'crypto'
import { map, Observable } from 'rxjs'

@Injectable()
export class SecurityLayerInterceptor implements NestInterceptor {
  private readonly security = SecurityLayer.getInstance()

  constructor() {
    console.log(`Security server key: ${this.security.getPublicKey()}`)
  }

  public getPublicKey(): KeyLike {
    return this.security.getPublicKey()
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const { sign = '' } = request.headers
    const { publicKey, data } = request.body
    const handlerName = context.getHandler().name

    if (handlerName === 'getPublicKey') {
      return next.handle()
    }

    if (
      !sign ||
      (data && !this.security.check(publicKey, sign, Buffer.from(data.data)))
    ) {
      throw new NotAcceptableException('Cannot check body content')
    }
    const body = this.security.decrypt(Buffer.from(data.data))
    request.body = body
    return next.handle().pipe(
      map((data: Record<string, any>) => {
        const encryptedData = this.security.encrypt(publicKey, data)
        const sign = this.security.sign(encryptedData)
        response.setHeader('sign', sign)
        return {
          publicKey: this.security.getPublicKey(),
          data: encryptedData,
        }
      }),
    )
  }
}
