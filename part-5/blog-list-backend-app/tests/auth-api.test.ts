import { Application } from 'express';
import mongoose, { Model } from 'mongoose';
import supertest from 'supertest';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';

const app: Application = require('../app');
const UserModel: Model<User> = require('../models/user');
const helper = require('./test-helper');

const api = supertest(app);
const saltLength = 10;

beforeAll(async () => {
  await UserModel.deleteMany();

  const userPromises: Promise<User>[] = helper.initialUsers.map(async (user: any) => {
    const newUser: User = new UserModel({ ...user, passwordHash: await bcrypt.hash(user.password, saltLength) });
    return UserModel.create(newUser);
  });
  await Promise.all(userPromises);
}, 40000);

describe('test authentication api', () => {
  test('user must provide username', async () => {
    const userData = {
      password: 'test123',
    };

    const response = await api
      .post('/api/auth/login')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`username` is required');
  });

  test('user must provide password', async () => {
    const userData = {
      username: 'test123',
    };

    const response = await api
      .post('/api/auth/login')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`password` is required');
  });

  test('if credentials are incorrect, user can not login', async () => {
    const userData = {
      username: 'root',
      password: 'rooter1232313',
    };

    const response = await api
      .post('/api/auth/login')
      .send(userData)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('invalid username or password');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
