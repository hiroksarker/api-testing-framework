import { Logger, LogLevel } from '../utils/logger';
import { EnvConfig } from './env-config';

// Configure logger based on environment
export function initializeLogger() {
  const env = EnvConfig.env;
  
  // Default configuration
  const loggerConfig = {
    logLevel: LogLevel.INFO,
    logToFile: false
  };
  
  // Adjust based on environment
  if (env === 'dev') {
    loggerConfig.logLevel = LogLevel.DEBUG;
  } else if (env === 'staging') {
    loggerConfig.logLevel = LogLevel.INFO;
    loggerConfig.logToFile = true;
  } else if (env === 'prod') {
    loggerConfig.logLevel = LogLevel.WARN;
    loggerConfig.logToFile = true;
  }
  
  // Apply configuration
  Logger.configure(loggerConfig);
}