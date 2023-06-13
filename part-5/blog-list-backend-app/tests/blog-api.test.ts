import { Application } from 'express';
import mongoose, { Model } from 'mongoose';
import supertest from 'supertest';
import * as bcrypt from 'bcrypt';
import { Blog } from '../models/blog';
import { User } from '../models/user';

const app: Application = require('../app');
const BlogModel: Model<Blog> = require('../models/blog');
const UserModel: Model<User> = require('../models/user');
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

describe('blog GET test', () => {
  test('blog api', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blog has id property', async () => {
    const existingBlogs: Blog[] = await helper.getBlogsInDb();
    const firstBlog: Blog = existingBlogs[0];
    expect(firstBlog.id).toBeDefined();
  });
});

describe('blog POST test', () => {
  test('successfully creates a new blog post', async () => {
    const token = await helper.getRootUserToken();

    const blogsBefore: Blog[] = await helper.getBlogsInDb();

    const newBlog = {
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter: Blog[] = await helper.getBlogsInDb();

    expect(blogsAfter).toHaveLength(blogsBefore.length + 1);
  });

  test('property likes default value zero', async () => {
    const token = await helper.getRootUserToken();

    const newBlogWithoutLikes = {
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
    };

    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response: Blog[] = await helper.getBlogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length + 1);

    const lastAddedBlog: Blog | undefined = response.find(
      (blog: Blog) => blog.title === 'Deep Dive Into Modern Web Development'
    );
    expect(lastAddedBlog?.likes).toBe(0);
  });

  test('status 400 if title is missing', async () => {
    const token = await helper.getRootUserToken();

    const newBlogWithoutLikes = {
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    };

    await api.post('/api/blogs').send(newBlogWithoutLikes).set('Authorization', `Bearer ${token}`).expect(400);

    const response: Blog[] = await helper.getBlogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  });

  test('status 400 if url is missing', async () => {
    const token = await helper.getRootUserToken();

    const newBlogWithoutLikes = {
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      likes: 2,
    };

    await api.post('/api/blogs').send(newBlogWithoutLikes).set('Authorization', `Bearer ${token}`).expect(400);

    const response: Blog[] = await helper.getBlogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  });

  test('unauthorized if user does not provide token', async () => {
    const blogsBefore: Blog[] = await helper.getBlogsInDb();

    const newBlog = {
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('invalid token');

    const blogsAfter: Blog[] = await helper.getBlogsInDb();

    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });
});

describe('blog DELETE test', () => {
  test('unauthorized if person that not created blog tries to delete it', async () => {
    const token = await helper.getAnotherUserToken();
    const blogsBefore: Blog[] = await helper.getBlogsInDb();

    const blog: Blog = blogsBefore[0];

    await api.delete(`/api/blogs/${blog.id}`).set('Authorization', `Bearer ${token}`).expect(401);

    const blogsAfter: Blog[] = await helper.getBlogsInDb();

    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });

  test('can delete own blog', async () => {
    const token = await helper.getRootUserToken();
    const blogsBefore: Blog[] = await helper.getBlogsInDb();

    const blog: Blog = blogsBefore[0];

    await api.delete(`/api/blogs/${blog.id}`).set('Authorization', `Bearer ${token}`).expect(204);

    const blogsAfter: Blog[] = await helper.getBlogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
