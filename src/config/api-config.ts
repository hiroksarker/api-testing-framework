import { EnvConfig } from './env-config';

export const ApiConfig = {
  baseUrl: EnvConfig.baseUrl,
  timeoutMs: EnvConfig.timeoutMs,
  defaultHeaders: EnvConfig.defaultHeaders
};