import { apiContext } from './api-context';
import { Post, PostSchema, PostsSchema } from '../models/post.model';
import { Logger } from '../utils/logger';
import { ResponseValidator } from '../utils/response-validator';

export async function getPosts() {
  try {
    Logger.info('Fetching all posts');
    const response = await apiContext.get('/posts');
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validateArray(response.body, PostSchema);
    Logger.info(`Retrieved ${validatedData.length} posts`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error('Error fetching posts', error);
    throw error;
  }
}

export async function getPostById(id: number) {
  try {
    Logger.info(`Fetching post with ID: ${id}`);
    const response = await apiContext.get(`/posts/${id}`);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validate(response.body, PostSchema);
    Logger.info(`Retrieved post: ${validatedData.title}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error(`Error fetching post with ID: ${id}`, error);
    throw error;
  }
}

export async function getPostsByUser(userId: number) {
  try {
    Logger.info(`Fetching posts for user ID: ${userId}`);
    const response = await apiContext.get(`/users/${userId}/posts`);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validateArray(response.body, PostSchema);
    Logger.info(`Retrieved ${validatedData.length} posts for user ${userId}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error(`Error fetching posts for user ID: ${userId}`, error);
    throw error;
  }
}

export async function createPost(post: Partial<Post>) {
  try {
    Logger.info('Creating new post', post);
    const response = await apiContext.post('/posts', post);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validate(response.body, PostSchema);
    Logger.info(`Post created with ID: ${validatedData.id}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error('Error creating post', error);
    throw error;
  }
}

export async function updatePost(id: number, post: Partial<Post>) {
  try {
    Logger.info(`Updating post with ID: ${id}`, post);
    const response = await apiContext.put(`/posts/${id}`, post);
    
    // Validate response against our schema
    const validatedData = ResponseValidator.validate(response.body, PostSchema);
    Logger.info(`Post updated: ${validatedData.title}`);
    
    return {
      ...response,
      body: validatedData
    };
  } catch (error) {
    Logger.error(`Error updating post with ID: ${id}`, error);
    throw error;
  }
}

export async function deletePost(id: number) {
  try {
    Logger.info(`Deleting post with ID: ${id}`);
    const response = await apiContext.delete(`/posts/${id}`);
    Logger.info(`Post deleted, status: ${response.status}`);
    
    return response;
  } catch (error) {
    Logger.error(`Error deleting post with ID: ${id}`, error);
    throw error;
  }
}