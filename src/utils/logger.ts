import fs from 'fs';
import path from 'path';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

export class Logger {
  private static logLevel: LogLevel = LogLevel.INFO;
  private static logToFile: boolean = false;
  private static logFilePath: string = path.join(process.cwd(), 'logs', 'api-tests.log');
  
  static configure(options: {
    logLevel?: LogLevel,
    logToFile?: boolean,
    logFilePath?: string
  }) {
    if (options.logLevel !== undefined) {
      this.logLevel = options.logLevel;
    }
    
    if (options.logToFile !== undefined) {
      this.logToFile = options.logToFile;
      
      // Ensure log directory exists
      if (this.logToFile) {
        const logDir = path.dirname(this.logFilePath);
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
      }
    }
    
    if (options.logFilePath) {
      this.logFilePath = options.logFilePath;
    }
    
    this.info(`Logger configured: level=${LogLevel[this.logLevel]}, logToFile=${this.logToFile}`);
  }
  
  private static writeToFile(message: string) {
    if (!this.logToFile) return;
    
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(this.logFilePath, logMessage);
  }
  
  static debug(message: string, data?: any) {
    if (this.logLevel <= LogLevel.DEBUG) {
      const dataString = data ? `: ${JSON.stringify(data, null, 2)}` : '';
      const fullMessage = `[DEBUG] ${message}${dataString}`;
      console.debug(fullMessage);
      this.writeToFile(fullMessage);
    }
  }
  
  static info(message: string, data?: any) {
    if (this.logLevel <= LogLevel.INFO) {
      const dataString = data ? `: ${JSON.stringify(data, null, 2)}` : '';
      const fullMessage = `[INFO] ${message}${dataString}`;
      console.info(fullMessage);
      this.writeToFile(fullMessage);
    }
  }
  
  static warn(message: string, data?: any) {
    if (this.logLevel <= LogLevel.WARN) {
      const dataString = data ? `: ${JSON.stringify(data, null, 2)}` : '';
      const fullMessage = `[WARN] ${message}${dataString}`;
      console.warn(fullMessage);
      this.writeToFile(fullMessage);
    }
  }
  
  static error(message: string, data?: any) {
    if (this.logLevel <= LogLevel.ERROR) {
      const dataString = data ? `: ${JSON.stringify(data, null, 2)}` : '';
      const fullMessage = `[ERROR] ${message}${dataString}`;
      console.error(fullMessage);
      this.writeToFile(fullMessage);
    }
  }

  static logRequest(method: string, url: string, headers: Record<string, any>, body?: any) {
    if (this.logLevel <= LogLevel.INFO) {
      this.info(`API Request: ${method} ${url}`);
      this.debug('Request Headers', headers);
      
      if (body) {
        this.debug('Request Body', body);
      }
    }
  }

  static logResponse(status: number, headers: Record<string, any>, body: any, duration: number) {
    if (this.logLevel <= LogLevel.INFO) {
      this.info(`API Response (${duration}ms): Status ${status}`);
      this.debug('Response Headers', headers);
      this.debug('Response Body', body);
    }
  }
  
  static logError(error: any) {
    this.error('Error occurred', {
      message: error.message,
      stack: error.stack,
      response: error.response ? {
        status: error.response.status,
        body: error.response.body
      } : 'No response'
    });
  }
}