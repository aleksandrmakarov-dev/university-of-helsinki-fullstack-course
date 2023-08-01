import { Card, Spinner } from 'flowbite-react';
import { useQuery } from 'react-query';
import BlogData from '../interfaces/BlogData';
import BlogService from '../services/BlogService';

const BlogsPage = () => {
  const { data, isLoading, isError } = useQuery('blogs', BlogService.getAll, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error while fetching data</div>;
  }

  if (data.length === 0) {
    return <p>No blogs found</p>;
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold">Blogs</h2>
      <div className="grid grid-cols-3 gap-4 py-5">
        {data?.map((i: BlogData) => (
          <Card key={i.id} href={`/blogs/${i.id}`}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900">{i.title}</h5>
            <p className="font-normal text-gray-700 text-end">Written by {i.author}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
