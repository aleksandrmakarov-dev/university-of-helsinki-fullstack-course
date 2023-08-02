import { Button, Spinner } from 'flowbite-react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import BlogService from '../services/BlogService';
import BlogData from '../interfaces/BlogData';
import BlogUpdateData from '../interfaces/BlogUpdateData';
import { AppState } from '../store';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { showNotification } from '../reducers/notificationReducer';

const BlogPage = () => {
  const blogPageParams = useParams();
  const navigation = useNavigate();
  const user = useSelector((state: AppState) => state.auth);
  const blogId = blogPageParams.id;

  const [blog, setBlog] = useState<BlogData | null>(null);

  const dispatch = useAppDispatch();

  const {
    data,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useQuery<BlogData[]>('blog', BlogService.getAll, {
    onSuccess: (blogs: BlogData[]) => {
      if (!blogId) {
        setBlog(null);
      } else {
        const foundBlog = blogs.find((i: BlogData) => i.id === blogId) ?? null;
        setBlog(foundBlog);
      }
    },
  });

  const { mutate: blogUpdateMutation, isLoading: isBlogUpdateLoading } = useMutation<
    BlogData,
    AxiosError,
    { id: string; data: BlogUpdateData }
  >({
    mutationFn: async (params: { id: string; data: BlogUpdateData }) => BlogService.update(params.id, params.data),
  });

  const { mutate: blogRemoveMutation, isLoading: isBlogRemoveLoading } = useMutation<any, AxiosError, string>(
    BlogService.remove
  );

  if (isBlogLoading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  }

  if (!data || isBlogError || !blogId) {
    return <div>Failed while fetching data</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const onLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id } as BlogUpdateData;
    blogUpdateMutation(
      { id: blog.id, data: updatedBlog },
      {
        onSuccess: (d: BlogData) => {
          setBlog(d);
        },
        onError: (error: AxiosError<any>) => {
          dispatch(showNotification({ type: 'failure', text: error.response?.data.error, timeout: 10000 }));
        },
      }
    );
  };

  const onRemove = () => {
    const dlgResult = window.confirm(`Are you sure you want to removed "${blog.title}" blog?`);
    if (dlgResult === true) {
      blogRemoveMutation(blog.id, {
        onSuccess: () => {
          dispatch(showNotification({ type: 'success', text: 'Blog removed successfully', timeout: 5000 }));
          navigation('/');
        },
        onError: (error: AxiosError<any>) => {
          dispatch(showNotification({ type: 'failure', text: error.response?.data.error, timeout: 10000 }));
        },
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold block">
        "{blog.title}" written by {blog.author}
      </h2>
      <div className="py-4">
        <div className="flex gap-x-2">
          <span>Source:</span>
          <a className="hover:underline mb-2 block" href={blog.url}>
            {blog.url}
          </a>
        </div>
        <p>Added by {blog.user.name}</p>
      </div>
      <div className="flex gap-x-2 items-center text-gray-600 mb-10">
        <button
          onClick={onLike}
          disabled={isBlogUpdateLoading}
          className="like-btn p-2 rounded-full bg-gray-200 text-gray-600 transition-all hover:bg-pink-200 hover:text-pink-600 focus:ring-4 focus:ring-pink-100 focus:text-pink-600 focus:bg-pink-200"
        >
          <FaHeart />
        </button>
        <p>{blog.likes}</p>
      </div>
      {user?.username === blog.user.username ? (
        <Button disabled={isBlogRemoveLoading} isProcessing={isBlogRemoveLoading} color="failure" onClick={onRemove}>
          <FaTrash className="mr-2 h-5 w-5" />
          <p>Remove</p>
        </Button>
      ) : null}
    </div>
  );
};

export default BlogPage;
