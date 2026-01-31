/**
 * Integration Tests for Users API
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../../models/User');

// Use in-memory MongoDB for testing
beforeAll(async () => {
  const mongoUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/testing-demo-test';
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Users API', () => {
  describe('GET /api/users', () => {
    test('should return empty array when no users', async () => {
      const res = await request(app).get('/api/users');
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('should return all users', async () => {
      await User.create([
        { username: 'user1', email: 'user1@test.com', password: 'Password1' },
        { username: 'user2', email: 'user2@test.com', password: 'Password1' }
      ]);

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by id', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@test.com',
        password: 'Password1'
      });

      const res = await request(app).get(`/api/users/${user._id}`);

      expect(res.status).toBe(200);
      expect(res.body.username).toBe('testuser');
      expect(res.body.email).toBe('test@test.com');
      expect(res.body.password).toBeUndefined(); // Password should be excluded
    });

    test('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/users/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });

  describe('POST /api/users', () => {
    test('should create new user', async () => {
      const userData = {
        username: 'newuser',
        email: 'new@test.com',
        password: 'Password1'
      };

      const res = await request(app)
        .post('/api/users')
        .send(userData);

      expect(res.status).toBe(201);
      expect(res.body.username).toBe('newuser');
      expect(res.body.email).toBe('new@test.com');
      expect(res.body._id).toBeDefined();
    });

    test('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ username: 'onlyusername' });

      expect(res.status).toBe(400);
    });

    test('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          username: 'testuser',
          email: 'invalid-email',
          password: 'Password1'
        });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update user', async () => {
      const user = await User.create({
        username: 'original',
        email: 'original@test.com',
        password: 'Password1'
      });

      const res = await request(app)
        .put(`/api/users/${user._id}`)
        .send({ displayName: 'Updated Name' });

      expect(res.status).toBe(200);
      expect(res.body.displayName).toBe('Updated Name');
      expect(res.body.username).toBe('original');
    });

    test('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/users/${fakeId}`)
        .send({ displayName: 'Test' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('should delete user', async () => {
      const user = await User.create({
        username: 'todelete',
        email: 'delete@test.com',
        password: 'Password1'
      });

      const res = await request(app).delete(`/api/users/${user._id}`);

      expect(res.status).toBe(204);

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });

    test('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/users/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });
});
