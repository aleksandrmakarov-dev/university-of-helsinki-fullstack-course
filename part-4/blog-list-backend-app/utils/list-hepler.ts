import _ from 'lodash';
import { Blog } from '../models/blog';

const dummy = (_blogs: Blog[]) => {
  return 1;
};

const totalLikes = (blogs: Blog[]) => {
  const sum = blogs.reduce((accumulator: number, blog: Blog) => accumulator + blog.likes, 0);
  return sum;
};

const favoriteBlog = (blogs: Blog[]) => {
  const maxLikes: number = Math.max(...blogs.map((blog: Blog) => blog.likes));
  return blogs.find((blog: Blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs: Blog[]) => {
  const mostBlogsAuthor = _.chain(blogs)
    .groupBy((blog: Blog) => blog.author)
    .map((associatedBlogs: Blog[], author: string) => ({
      author,
      blogs: associatedBlogs.length,
    }))
    .maxBy(obj => obj.blogs)
    .value();

  return mostBlogsAuthor;
};

const mostLikes = (blogs: Blog[]) => {
  const mostLikesAuthor = _.chain(blogs)
    .groupBy((blog: Blog) => blog.author)
    .map((associatedBlogs: Blog[], author: string) => ({
      author,
      likes: associatedBlogs.reduce((accumulator: number, blog: Blog) => accumulator + blog.likes, 0),
    }))
    .maxBy(obj => obj.likes)
    .value();

  return mostLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
