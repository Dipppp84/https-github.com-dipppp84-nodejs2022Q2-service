import { ConsoleLogger, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import { WriteStream } from 'fs';
import * as path from 'path';

export class MyLogger extends ConsoleLogger {
  loggerLevel: number;
  logDir: string;
  logSize: number;
  writeableStream: WriteStream;

  constructor() {
    super('MyLoggerContext', { logLevels: ['log', 'error', 'warn', 'debug', 'verbose'] });
    this.loggerLevel = Number(process.env.LOG_LEVEL) || 0;
    if (Boolean(process.env.LOG_TURN)) {
      this.logDir = process.env.LOG_DIR || './log';
      this.logSize = Number(process.env.LOG_MAX_SIZE) * 1024;
      if (!fs.existsSync(this.logDir))
        fs.mkdirSync(this.logDir);
      this.writeableStream = fs.createWriteStream(path.join(this.logDir, 'log-' + new Date().getTime()) + '.txt', { flags: 'a+' });
    }
  }

  log(message: string, ...optionalParams) {
    super.log(message, ...optionalParams);
  }

  error(message: string, stack?: string, context?: string) {
    if (this.loggerLevel >= MyLogLevel.ERROR)
      super.error(message, stack, context);
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
    if (context === 'MyLoggerContext') {
      this.writeInLogFile(`Time: ${new Date().toLocaleString()} [${logLevel.toUpperCase()}] ${messages[0]}`);
    }
    super.printMessages(messages, context, logLevel, writeStreamType);
  }

  private writeInLogFile(message: string): void {
    if (this.writeableStream) {
      if (this.writeableStream.bytesWritten > this.logSize)
        this.writeableStream = fs.createWriteStream(path.join(this.logDir, 'log-' + new Date().getTime()) + '.txt', { flags: 'a+' });
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