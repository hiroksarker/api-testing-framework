import { expect } from 'chai';
import { getPosts, getPostById, getPostsByUser, createPost, updatePost, deletePost } from '../api/post-api';
import { Post } from '../models/post.model';
import { TestData } from '../utils/test-data';

describe('Post API', () => {
  it('should return a list of posts', async () => {
    const response = await getPosts();
    const posts: Post[] = response.body;
    
    expect(response.status).to.equal(200);
    expect(posts).to.be.an('array');
    expect(posts.length).to.be.greaterThan(0);
    expect(posts[0]).to.have.property('title');
    expect(posts[0]).to.have.property('body');
  });

  it('should return a single post by ID', async () => {
    const response = await getPostById(1);
    const post: Post = response.body;
    
    expect(response.status).to.equal(200);
    expect(post.id).to.equal(1);
    expect(post).to.have.property('title');
    expect(post).to.have.property('body');
  });

  it('should return posts by user ID', async () => {
    const userId = 1;
    const response = await getPostsByUser(userId);
    const posts: Post[] = response.body;
    
    expect(response.status).to.equal(200);
    expect(posts).to.be.an('array');
    expect(posts.length).to.be.greaterThan(0);
    expect(posts.every(post => post.userId === userId)).to.be.true;
  });

  it('should create a new post', async () => {
    const newPost = TestData.generatePost();
    const response = await createPost(newPost);
    const post: Post = response.body;
    
    expect(response.status).to.equal(201);
    expect(post.title).to.equal(newPost.title);
    expect(post.body).to.equal(newPost.body);
    expect(post.userId).to.equal(newPost.userId);
    expect(post).to.have.property('id');
  });

  it('should update an existing post', async () => {
    const updatedData = {
      userId: 1,
      title: 'Updated Title',
      body: 'This is the updated body content.'
    };
    
    const response = await updatePost(1, updatedData);
    const post: Post = response.body;
    
    expect(response.status).to.equal(200);
    expect(post.title).to.equal(updatedData.title);
    expect(post.body).to.equal(updatedData.body);
    expect(post.id).to.equal(1);
  });

  it('should delete a post', async () => {
    const response = await deletePost(1);
    
    expect(response.status).to.equal(200);
  });
});