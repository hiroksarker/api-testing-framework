import dotenv from 'dotenv';

dotenv.config();

type Environment = 'dev' | 'staging' | 'prod';

const env: Environment = (process.env.API_ENV as Environment) || 'dev';

const environments = {
  dev: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    timeoutMs: 30000,
  },
  staging: {
    baseUrl: 'https://staging-api.example.com',
    timeoutMs: 45000,
  },
  prod: {
    baseUrl: 'https://api.example.com',
    timeoutMs: 60000,
  }
};

export const EnvConfig = {
  env,
  ...environments[env],
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
};