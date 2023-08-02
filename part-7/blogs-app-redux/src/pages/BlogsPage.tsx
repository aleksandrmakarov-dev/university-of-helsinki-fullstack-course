import { Button, Spinner } from 'flowbite-react';
import { useQuery } from 'react-query';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogData from '../interfaces/BlogData';
import BlogService from '../services/BlogService';
import BlogItem from '../components/BlogItem';
import CreateBlogForm, { ModalHandle } from '../components/CreateBlogForm';
import { AppState } from '../store';

const BlogsPage = () => {
  const { data, isLoading, isError } = useQuery('blogs', BlogService.getAll, {
    refetchOnWindowFocus: false,
  });

  const user = useSelector((state: AppState) => state.auth);

  const modalElement = useRef<ModalHandle>(null);

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
      <div className="flex gap-x-2 item-center justify-between">
        <h2 className="text-4xl font-semibold">Blogs</h2>
        {user && (
          <>
            <Button color="success" onClick={() => modalElement.current?.changeVisibility(true)}>
              Create Blog
            </Button>
            <CreateBlogForm ref={modalElement} />
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 py-5">
        {data?.map((i: BlogData) => (
          <BlogItem key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
