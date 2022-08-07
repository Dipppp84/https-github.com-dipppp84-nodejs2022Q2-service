import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body, method, originalUrl, query } = req;
    const {password, ...resBody} = body;
    res.on('finish', () => {
      Logger.log(`method: ${method} url: ${originalUrl} statusCode: ${res.statusCode} body: ${JSON.stringify(resBody)} query params: ${JSON.stringify(query)}`);
    });

    next();
  }
}