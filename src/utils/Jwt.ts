import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

export class Jwt {
  private static readonly secretKey: string = secretKey;

  static generateToken(
    payload: Payload,
    expiresIn: number | string = '15m'
  ): string {
    const token = jwt.sign(payload, this.secretKey, { expiresIn });
    return token;
  }

  static verifyToken(token: string) {
    const payload = jwt.verify(token, this.secretKey) as Payload;
    return payload;
  }
}
