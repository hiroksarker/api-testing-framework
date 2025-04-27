import { initializeLogger } from '../config/logger-config';
import { Logger } from '../utils/logger';

export function setupTestHooks() {
  before(() => {
    initializeLogger();
    Logger.info('Test suite started');
  });

  after(() => {
    Logger.info('Test suite completed');
  });

  beforeEach(function() {
    Logger.info(`Running test: ${this.currentTest?.title}`);
  });

  afterEach(function() {
    const test = this.currentTest;
    if (test) {
      Logger.info(`Test completed: ${test.title} (${test.state})`);
    }
  });
} 