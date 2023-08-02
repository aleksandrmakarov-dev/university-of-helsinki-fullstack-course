import { Application } from 'express';
import mongoose, { Model } from 'mongoose';
import supertest from 'supertest';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import { Blog } from '../models/blog';
import { UserDTO } from './test-helper';

const app: Application = require('../app');
const UserModel: Model<User> = require('../models/user');
const BlogModel: Model<Blog> = require('../models/blog');
const helper = require('./test-helper');

const api = supertest(app);
const saltLength = 10;

beforeEach(async () => {
  await BlogModel.deleteMany();
  await UserModel.deleteMany();

  const userPromises: Promise<User>[] = helper.initialUsers.map(async (user: any) => {
    const newUser: User = new UserModel({ ...user, passwordHash: await bcrypt.hash(user.password, saltLength) });
    return UserModel.create(newUser);
  });

  const users: User[] = await Promise.all(userPromises);

  const user: User | undefined = users.find((u: User) => u.username === helper.initialUsers[0].username);

  if (!user) {
    throw new Error('root user is undefined');
  }

  // Map blog so it has root user as owner and it as promise
  const promises: Promise<Blog>[] = helper.initialBlogs.map((blog: any) => {
    const newBlog: Blog = new BlogModel({ ...blog, user: user.id });
    return BlogModel.create(newBlog);
  });

  // Wait all promises
  const createdBlogs: Blog[] = await Promise.all(promises);
  // Push blogs ids to user
  user.blogs.push(...createdBlogs.map((blog: Blog) => blog.id));
  // Update user
  await user.save();
}, 30000);

describe('test user post endpoint', () => {
  test('create valid user', async () => {
    const usersBefore: UserDTO[] = await helper.getUsersInDb();

    const userBody = {
      username: 'user1',
      name: 'User 1',
      password: 'user123',
    };

    await api
      .post('/api/users')
      .send(userBody)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfter: UserDTO[] = await helper.getUsersInDb();

    expect(usersAfter).toHaveLength(usersBefore.length + 1);
    const usernames: string[] = usersAfter.map((user: UserDTO) => user.username);
    expect(usernames).toContain(userBody.username);
  }, 20000);

  test('only unique username', async () => {
    const usersBefore: UserDTO[] = await helper.getUsersInDb();

    const userBody = {
      username: 'root',
      name: 'User 1',
      password: 'user123',
    };

    const response = await api
      .post('/api/users')
      .send(userBody)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter: UserDTO[] = await helper.getUsersInDb();

    expect(response.body.error).toContain('to be unique');

    expect(usersAfter).toHaveLength(usersBefore.length);
  });

  test('minimum username length is 3', async () => {
    const usersBefore: UserDTO[] = await helper.getUsersInDb();

    const userBody = {
      username: 'ro',
      name: 'User 1',
      password: 'user123',
    };

    const response = await api
      .post('/api/users')
      .send(userBody)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter: UserDTO[] = await helper.getUsersInDb();

    expect(response.body.error).toContain('is shorter than the minimum allowed length');

    expect(usersAfter).toHaveLength(usersBefore.length);
  });

  test('minimum password length is 3', async () => {
    const usersBefore: UserDTO[] = await helper.getUsersInDb();

    const userBody = {
      username: 'alex',
      name: 'Alex',
      password: 'us',
    };

    const response = await api
      .post('/api/users')
      .send(userBody)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter: UserDTO[] = await helper.getUsersInDb();

    expect(response.body.error).toContain('is shorter than the minimum allowed length');

    expect(usersAfter).toHaveLength(usersBefore.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
