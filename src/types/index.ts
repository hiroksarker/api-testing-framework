// Common types used across the application
export interface ApiResponse<T> {
  status: number;
  body: T;
  headers: Record<string, string>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface TestContext {
  testId: string;
  startTime: number;
  endTime?: number;
  status?: 'passed' | 'failed' | 'skipped';
  error?: Error;
} 