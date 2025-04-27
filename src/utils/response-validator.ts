import { z } from 'zod';
import { Logger } from './logger';

export class ResponseValidator {
  static validate<T>(data: any, schema: z.ZodType<T>): T {
    try {
      Logger.debug('Validating response data against schema');
      return schema.parse(data);
    } catch (error) {
      Logger.error('Validation error:', error);
      throw error;
    }
  }
  
  static validateArray<T>(data: any, schema: z.ZodType<T>): T[] {
    if (!Array.isArray(data)) {
      const error = new Error('Expected an array but received: ' + typeof data);
      Logger.error('Validation error:', error);
      throw error;
    }
    
    try {
      Logger.debug(`Validating array of ${data.length} items`);
      return data.map((item, index) => {
        try {
          return schema.parse(item);
        } catch (error) {
          Logger.error(`Validation error at index ${index}:`, error);
          throw error;
        }
      });
    } catch (error) {
      Logger.error('Array validation error:', error);
      throw error;
    }
  }
}