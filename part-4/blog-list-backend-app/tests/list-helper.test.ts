import { Blog } from '../models/blog';

const listHelper = require('../utils/list-hepler');

test('dummy returns one', () => {
  const blogs: Blog[] = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
