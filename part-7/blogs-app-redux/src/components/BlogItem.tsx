import { Card } from 'flowbite-react';
import { FC } from 'react';
import BlogData from '../interfaces/BlogData';

interface BlogItemProps {
  data: BlogData;
}

const BlogItem: FC<BlogItemProps> = ({ data }) => {
  return (
    <>
      <Card href={`/blogs/${data.id}`}>
        <h5 className="text-xl font-bold tracking-tight text-gray-900">{data.title}</h5>
        <p className="font-normal text-gray-700 text-end">Written by {data.author}</p>
      </Card>
    </>
  );
};

export default BlogItem;
