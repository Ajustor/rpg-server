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
    const { publicKey = '', sign = '' } = request.headers
    const handlerName = context.getHandler().name
    console.log(handlerName, request.body, request.headers)
    console.log(typeof request.body)

    if (handlerName === 'getPublicKey') {
      return next.handle()
    }

    if (
      request.body &&
      !this.security.check(publicKey, sign, Buffer.from(request.body))
    ) {
      throw new NotAcceptableException('Cannot check body content')
    }
    const body = this.security.decrypt(request.body)
    console.log(body)
    return next.handle().pipe(
      map((data: Record<string, any>) => {
        console.log(data)
        const encryptedData = this.security.encrypt(publicKey, data)
        const sign = this.security.sign(encryptedData)
        request.headers.sign = sign
        return encryptedData
      }),
    )
  }
}
