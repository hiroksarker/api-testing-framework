import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Logger } from './logger';

export class TestData {
  static generateUser(overrides: Partial<User> = {}): User {
    Logger.debug('Generating test user data', overrides);
    
    return {
      id: Math.floor(Math.random() * 1000),
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'Testville',
        zipcode: '12345-6789',
        geo: {
          lat: '0',
          lng: '0'
        }
      },
      phone: '123-456-7890',
      website: 'test.com',
      company: {
        name: 'Test Co',
        catchPhrase: 'Testing is fun!',
        bs: 'test solutions'
      },
      ...overrides
    };
  }

  static generatePost(overrides: Partial<Post> = {}): Post {
    Logger.debug('Generating test post data', overrides);
    
    return {
      userId: Math.floor(Math.random() * 10) + 1,
      id: Math.floor(Math.random() * 1000),
      title: 'Test Post Title',
      body: 'This is the body of a test post. It contains test content.',
      ...overrides
    };
  }
}