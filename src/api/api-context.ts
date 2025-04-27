import request from 'supertest';
import { ApiConfig } from '../config/api-config';
import { Logger } from '../utils/logger';

export class ApiContext {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = ApiConfig.baseUrl;
    this.defaultHeaders = ApiConfig.defaultHeaders;
    Logger.debug('API Context initialized', { baseUrl: this.baseUrl });
  }

  async get(endpoint: string, headers: Record<string, string> = {}) {
    const mergedHeaders = { ...this.defaultHeaders, ...headers };
    const url = `${this.baseUrl}${endpoint}`;
    
    // Log request details
    Logger.logRequest('GET', url, mergedHeaders);
    
    const startTime = Date.now();
    let response;
    try {
      response = await request(this.baseUrl)
        .get(endpoint)
        .set(mergedHeaders)
        .timeout(ApiConfig.timeoutMs);
      
      const duration = Date.now() - startTime;
      Logger.logResponse(response.status, response.headers, response.body, duration);
      
      return response;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  async post(endpoint: string, body: any, headers: Record<string, string> = {}) {
    const mergedHeaders = { ...this.defaultHeaders, ...headers };
    const url = `${this.baseUrl}${endpoint}`;
    
    // Log request details
    Logger.logRequest('POST', url, mergedHeaders, body);
    
    const startTime = Date.now();
    let response;
    try {
      response = await request(this.baseUrl)
        .post(endpoint)
        .send(body)
        .set(mergedHeaders)
        .timeout(ApiConfig.timeoutMs);
      
      const duration = Date.now() - startTime;
      Logger.logResponse(response.status, response.headers, response.body, duration);
      
      return response;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  async put(endpoint: string, body: any, headers: Record<string, string> = {}) {
    const mergedHeaders = { ...this.defaultHeaders, ...headers };
    const url = `${this.baseUrl}${endpoint}`;
    
    // Log request details
    Logger.logRequest('PUT', url, mergedHeaders, body);
    
    const startTime = Date.now();
    let response;
    try {
      response = await request(this.baseUrl)
        .put(endpoint)
        .send(body)
        .set(mergedHeaders)
        .timeout(ApiConfig.timeoutMs);
      
      const duration = Date.now() - startTime;
      Logger.logResponse(response.status, response.headers, response.body, duration);
      
      return response;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  async delete(endpoint: string, headers: Record<string, string> = {}) {
    const mergedHeaders = { ...this.defaultHeaders, ...headers };
    const url = `${this.baseUrl}${endpoint}`;
    
    // Log request details
    Logger.logRequest('DELETE', url, mergedHeaders);
    
    const startTime = Date.now();
    let response;
    try {
      response = await request(this.baseUrl)
        .delete(endpoint)
        .set(mergedHeaders)
        .timeout(ApiConfig.timeoutMs);
      
      const duration = Date.now() - startTime;
      Logger.logResponse(response.status, response.headers, response.body, duration);
      
      return response;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

export const apiContext = new ApiContext();