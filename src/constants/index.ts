// API related constants
export const API_ENDPOINTS = {
  USERS: '/users',
  POSTS: '/posts',
  COMMENTS: '/comments',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Test related constants
export const TEST_CONSTANTS = {
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// Environment variables
export const ENV_VARS = {
  API_BASE_URL: 'API_BASE_URL',
  API_KEY: 'API_KEY',
  NODE_ENV: 'NODE_ENV',
} as const; 