import { apiContext } from './api-context';
import { User, UserSchema, UsersSchema } from '../models/user.model';
import { Logger } from '../utils/logger';
import { ResponseValidator } from '../utils/response-validator';

export async function getUsers() {
  try {
    Logger.info('Fetching all users');
    const response = await apiContext.get('/users');
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validateArray(response.body, UserSchema);
    Logger.info(`Retrieved ${validatedData.length} users`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error('Error fetching users', error);
    throw error;
  }
}

export async function getUserById(id: number) {
  try {
    Logger.info(`Fetching user with ID: ${id}`);
    const response = await apiContext.get(`/users/${id}`);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validate(response.body, UserSchema);
    Logger.info(`Retrieved user: ${validatedData.name}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error(`Error fetching user with ID: ${id}`, error);
    throw error;
  }
}

export async function createUser(user: Partial<User>) {
  try {
    Logger.info('Creating new user', user);
    const response = await apiContext.post('/users', user);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validate(response.body, UserSchema);
    Logger.info(`User created with ID: ${validatedData.id}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error('Error creating user', error);
    throw error;
  }
}

export async function updateUser(id: number, user: Partial<User>) {
  try {
    Logger.info(`Updating user with ID: ${id}`, user);
    const response = await apiContext.put(`/users/${id}`, user);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validate(response.body, UserSchema);
    Logger.info(`User updated: ${validatedData.name}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error(`Error updating user with ID: ${id}`, error);
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    Logger.info(`Deleting user with ID: ${id}`);
    const response = await apiContext.delete(`/users/${id}`);
    Logger.info(`User deleted, status: ${response.status}`);
    
    return response;
  } catch (error) {
    Logger.error(`Error deleting user with ID: ${id}`, error);
    throw error;
  }
}