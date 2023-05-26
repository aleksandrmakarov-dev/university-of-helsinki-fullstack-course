import { Blog } from '../models/blog';

const dummy = (_blogs: Blog[]) => {
  return 1;
};

const totalLikes = (blogs: Blog[]) => {
  const sum = blogs.reduce((accumulator: number, blog: Blog) => accumulator + blog.likes, 0);
  return sum;
};

module.exports = {
  dummy,
  totalLikes,
};
