import * as jwt from 'jsonwebtoken';
export default class JWT {
  static createAccessToken(payload: object) {
    try {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE,
      });
    } catch {
      return false;
    }
  }
  static verifyToken(Token: string) {
    try {
      return jwt.verify(Token, process.env.JWT_SECRET);
    } catch {
      return false;
    }
  }
  static createRefreshToken() {
    try {
      const payload = {
        value: Math.random() + new Date().getTime(),
      };
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
      });
    } catch {
      return false;
    }
  }
}
