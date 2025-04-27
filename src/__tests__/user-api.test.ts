import { expect } from 'chai';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../api/user-api';
import { User } from '../models/user.model';
import { TestData } from '../utils/test-data';
import { setupTestHooks } from './setup';

// Setup test hooks
setupTestHooks();

describe('User API', () => {
  it('should return a list of users', async () => {
    const response = await getUsers();
    const users: User[] = response.body;
    
    expect(response.status).to.equal(200);
    expect(users).to.be.an('array');
    expect(users.length).to.be.greaterThan(0);
    expect(users[0]).to.have.property('name');
    expect(users[0]).to.have.property('email');
    expect(users[0].company).to.have.property('name');
  });

  it('should return a single user by ID', async () => {
    const response = await getUserById(1);
    const user: User = response.body;
    
    expect(response.status).to.equal(200);
    expect(user.id).to.equal(1);
    expect(user).to.have.property('name');
    expect(user).to.have.property('email');
    expect(user.company).to.have.property('name');
  });

  it('should create a new user', async () => {
    const newUser = TestData.generateUser();
    const response = await createUser(newUser);
    const user: User = response.body;
    
    expect(response.status).to.equal(201);
    expect(user.name).to.equal(newUser.name);
    expect(user.email).to.equal(newUser.email);
    expect(user).to.have.property('id');
  });

  it('should update an existing user', async () => {
    const updatedData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    };
    
    const response = await updateUser(1, updatedData);
    const user: User = response.body;
    
    expect(response.status).to.equal(200);
    expect(user.name).to.equal(updatedData.name);
    expect(user.email).to.equal(updatedData.email);
    expect(user.id).to.equal(1);
  });

  it('should delete a user', async () => {
    const response = await deleteUser(1);
    
    expect(response.status).to.equal(200);
  });
});