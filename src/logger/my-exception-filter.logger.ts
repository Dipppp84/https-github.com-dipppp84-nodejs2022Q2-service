import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class MyExceptionFilterLogger implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    let resp = host.switchToHttp().getResponse();
    if (exception.status === HttpStatus.UNAUTHORIZED)
      Logger.warn(exception.message + ' ' + JSON.stringify(exception.response));
    else
      Logger.error(exception.message + ' ' + JSON.stringify(exception.response));
    resp.status(exception.status).json(exception.response);
  }
}