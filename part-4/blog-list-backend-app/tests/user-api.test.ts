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
  await UserModel.deleteMany();
  await BlogModel.deleteMany();

  const rootUserData = helper.rootUser;

  const passwordHash = await bcrypt.hash(rootUserData.password, saltLength);

  const rootUser: User = new UserModel({
    id: rootUserData.id,
    username: rootUserData.username,
    name: rootUserData.name,
    passwordHash,
  });

  // Create root user
  const user: User = await UserModel.create(rootUser);

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
});

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
  });

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
