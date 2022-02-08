import { Security } from '@ajustor/ajustor-utils'

export class SecurityLayer {
  static instance?: Security

  private constructor() {}

  static getInstance(): Security {
    if (!this.instance) {
      this.instance = new Security()
    }

    return this.instance
  }
}
