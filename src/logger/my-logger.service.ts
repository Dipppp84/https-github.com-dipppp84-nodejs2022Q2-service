import { ConsoleLogger, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import * as path from 'path';

export class MyLogger extends ConsoleLogger {
  private readonly loggerLevel: number;
  private readonly logSize: number;
  private writeableStream: WriteStream;
  private readonly logTurn: boolean;

  constructor() {
    super('MyLoggerContext', { logLevels: ['log', 'error', 'warn', 'debug', 'verbose'] });
    this.loggerLevel = Number(process.env.LOG_LEVEL) || 0;
    this.logTurn = Boolean(process.env.LOG_TURN);
    if (this.logTurn) {
      this.logSize = Number(process.env.LOG_MAX_SIZE) * 1024;
      this.writeableStream = fs.createWriteStream(path.join('.', 'log', 'log-' + new Date().getTime()) + '.txt', { flags: 'a+' });
    }
  }

  log(message: string, ...optionalParams) {
    super.log(message, ...optionalParams);
  }

  error(message: string, stack?: string, context?: string) {
    if (this.loggerLevel >= MyLogLevel.ERROR)
      super.error(message);
  }

  warn(message: any, ...optionalParams) {
    if (this.loggerLevel >= MyLogLevel.WARN)
      super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams) {
    if (this.loggerLevel >= MyLogLevel.DEBUG)
      super.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams) {
    if (this.loggerLevel >= MyLogLevel.VERBOSE)
      super.verbose(message, ...optionalParams);
  }


  protected printMessages(messages: string[], context?: string, logLevel?: LogLevel, writeStreamType?: 'stdout' | 'stderr') {
    if (this.logTurn && context === 'MyLoggerContext') {
      this.writeInLogFile(`Time: ${new Date().toLocaleString()} [${logLevel.toUpperCase()}] ${messages[0]}`);
    }
    super.printMessages(messages, context, logLevel, writeStreamType);
  }

  private writeInLogFile(message: string): void {
    if (this.writeableStream) {
      if (this.writeableStream.bytesWritten > this.logSize)
        this.writeableStream = fs.createWriteStream(path.join('.', 'log', 'log-' + new Date().getTime()) + '.txt', { flags: 'a+' });
      this.writeableStream.write(message + '\n');
    }
  }

}

enum MyLogLevel {
  LOG,
  ERROR,
  WARN,
  DEBUG,
  VERBOSE
}