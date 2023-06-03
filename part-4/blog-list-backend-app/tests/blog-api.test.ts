import { Application } from 'express';
import mongoose, { Model } from 'mongoose';
import supertest from 'supertest';
import { Blog } from '../models/blog';

const app: Application = require('../app');
const BlogModel: Model<Blog> = require('../models/blog');
const helper = require('./test-helper');

const api = supertest(app);

beforeEach(async () => {
  await BlogModel.deleteMany();
  const promises: Promise<Blog>[] = helper.initialBlogs.map((blog: Blog) => BlogModel.create(blog));
  await Promise.all(promises);
});

describe('blog api tests', () => {
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

  test('successfully creates a new blog post', async () => {
    const newBlog: Blog = new BlogModel({
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    });

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response: Blog[] = await helper.getBlogsInDb();

    expect(response).toHaveLength(helper.initialBlogs.length + 1);
    const blogsWithoutId = response.map((blog: Blog) => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    }));
    expect(blogsWithoutId).toContainEqual(newBlog);
  });

  test('property likes default value zero', async () => {
    const newBlogWithoutLikes = {
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
    };

    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
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
    const newBlogWithoutLikes = {
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    };

    await api.post('/api/blogs').send(newBlogWithoutLikes).expect(400);

    const response: Blog[] = await helper.getBlogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  }, 30000);

  test('status 400 if url is missing', async () => {
    const newBlogWithoutLikes = {
      title: 'Deep Dive Into Modern Web Development',
      author: 'Matti Luukkainen',
      likes: 2,
    };

    await api.post('/api/blogs').send(newBlogWithoutLikes).expect(400);

    const response: Blog[] = await helper.getBlogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
