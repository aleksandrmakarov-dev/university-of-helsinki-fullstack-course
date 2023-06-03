import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import supertest from 'supertest';
import { Application } from 'express';
import { User } from '../models/user';

const app: Application = require('../app');
const helper = require('./test-helper');
const UserModel: Model<User> = require('../models/user');

const api = supertest(app);

const saltLength = 10;

beforeEach(async () => {
  await UserModel.deleteMany();
  const passwordHash: string = await bcrypt.hashSync('admin', saltLength);
  const rootUser: User = new UserModel({
    username: 'root',
    name: 'root',
    passwordHash,
  });

  await UserModel.create(rootUser);
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersBefore: User[] = await helper.usersInDb();

    const newUser = {
      username: 'alex',
      name: 'Alex',
      password: 'admin',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfter: User[] = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);

    const usernames: string[] = usersAfter.map((user: User) => user.username);

    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersBefore: User[] = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Hacker',
      password: 'root',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const { error } = result.body;
    expect(error).toContain('expected `username` to be unique');

    const usersAfter: User[] = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
