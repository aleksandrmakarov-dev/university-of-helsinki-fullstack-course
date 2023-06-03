import mongoose, { Model } from 'mongoose';
import { Blog } from '../models/blog';
import { User } from '../models/user';

export interface UserDTO {
  id: string;
  username: string;
  name: string;
  blogs: mongoose.Types.Array<Blog>;
}

const BlogModel: Model<Blog> = require('../models/blog');
const UserModel: Model<User> = require('../models/user');

const rootUser = {
  username: 'root',
  name: 'Root User',
  password: 'root123',
};

const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const getBlogsInDb = async (): Promise<Blog[]> => {
  const existingBlogs: Blog[] = (await BlogModel.find()).map(blog => blog.toJSON());
  return existingBlogs;
};

const getUsersInDb = async (): Promise<UserDTO[]> => {
  const existingUsers: UserDTO[] = (await UserModel.find()).map(user => user.toJSON());
  return existingUsers;
};

module.exports = {
  rootUser,
  initialBlogs,
  getBlogsInDb,
  getUsersInDb,
};
