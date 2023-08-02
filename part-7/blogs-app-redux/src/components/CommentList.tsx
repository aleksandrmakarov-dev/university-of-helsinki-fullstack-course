import { Button, TextInput } from 'flowbite-react';
import { FC, FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import useField from '../hooks/useField';
import BlogService from '../services/BlogService';
import BlogData from '../interfaces/BlogData';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { showNotification } from '../reducers/notificationReducer';

interface MutationData {
  id: string;
  comment: string;
}

interface MutationOutputData {
  comment: string;
}

interface CommentListProps {
  blogId: string;
  comments: string[];
}

const CommentList: FC<CommentListProps> = ({ blogId, comments }) => {
  const { reset: resetComment, ...commentInput } = useField<string>('text', '', 'Enter comment...');

  const client = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate: createCommentMutation, isLoading: isCreateCommentLoading } = useMutation<
    MutationOutputData,
    AxiosError,
    MutationData
  >({
    mutationFn: async (params: MutationData) => BlogService.postComment(params.id, params.comment),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation(
      { id: blogId, comment: commentInput.value },
      {
        onSuccess: (d: MutationOutputData) => {
          const blog = client.getQueryData<BlogData>('blog');
          if (blog !== undefined) {
            client.setQueriesData('blog', { ...blog, comments: blog.comments.concat(d.comment) });
          }
        },
        onError: (error: AxiosError<any>) => {
          dispatch(
            showNotification({
              type: 'failure',
              text: error.response?.data.error,
              timeout: 5000,
            })
          );
        },
      }
    );
    resetComment();
  };

  return (
    <div className="max-w-screen-md">
      <h5 className="font-semibold text-xl block mb-4">Comments ({comments.length})</h5>
      <form onSubmit={onSubmit}>
        <div className="flex gap-x-2">
          <TextInput className="flex-1" {...commentInput} />
          <Button type="submit" isProcessing={isCreateCommentLoading}>
            Post
          </Button>
        </div>
      </form>
      <ul className="py-5">
        {comments.map((c: string, i: number) => (
          <li className="list-disc list-inside" key={i}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
