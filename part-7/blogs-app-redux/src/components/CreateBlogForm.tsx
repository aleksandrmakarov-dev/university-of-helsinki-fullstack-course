import { Label, TextInput, Button, Modal, Alert } from 'flowbite-react';
import React, { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { FaCircleInfo } from 'react-icons/fa6';
import useField from '../hooks/useField';
import BlogService from '../services/BlogService';
import BlogCreateData from '../interfaces/BlogCreateData';
import BlogData from '../interfaces/BlogData';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { showNotification } from '../reducers/notificationReducer';

export interface ModalHandle {
  changeVisibility: (value: boolean) => void;
}

const CreateBlogForm: React.ForwardRefRenderFunction<ModalHandle> = (_props, forwaredeRef) => {
  const [visibility, setVisibility] = useState<boolean>();

  const [validation, setValidation] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { reset: resetTitle, ...titleInput } = useField<string>('text', '', 'Enter title...');
  const { reset: resetAuthor, ...authorInput } = useField<string>('text', '', 'Enter author...');
  const { reset: resetSource, ...sourceInput } = useField<string>('text', '', 'Enter source...');

  const { mutate: blogCreateMutation, isLoading: isBlogCreateLoading } = useMutation<
    BlogData,
    AxiosError,
    BlogCreateData
  >(BlogService.create);

  const client = useQueryClient();

  React.useImperativeHandle(forwaredeRef, () => ({
    changeVisibility(value: boolean) {
      setVisibility(value);

      resetTitle();
      resetAuthor();
      resetSource();
      setValidation(null);
    },
  }));

  const onClose = () => {
    setVisibility(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogToCreate: BlogCreateData = {
      title: titleInput.value,
      author: authorInput.value,
      url: sourceInput.value,
    };

    blogCreateMutation(blogToCreate, {
      onSuccess: (d: BlogData) => {
        const blogs = client.getQueryData<BlogData[]>('blogs') ?? [];
        client.setQueriesData('blogs', blogs.concat(d));
        setVisibility(false);
        dispatch(showNotification({ type: 'success', text: `Blog "${d.title}" successfully created!`, timeout: 5000 }));
      },
      onError: (error: AxiosError<any>) => {
        setValidation(error.response?.data.error);
      },
    });
  };

  return (
    <>
      <Modal show={visibility} onClose={onClose}>
        <form onSubmit={onSubmit}>
          <Modal.Header>Create Blog</Modal.Header>
          <Modal.Body>
            <div className="flex mx-auto max-w-md flex-col gap-4">
              {validation && (
                <Alert color="failure" icon={FaCircleInfo}>
                  <span>
                    <p>{validation}</p>
                  </span>
                </Alert>
              )}
              <div className="block mb-2">
                <Label value="Title" />
                <TextInput {...titleInput} />
              </div>
              <div className="block mb-2">
                <Label value="Author" />
                <TextInput {...authorInput} />
              </div>
              <div className="block mb-2">
                <Label value="Source" />
                <TextInput {...sourceInput} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" isProcessing={isBlogCreateLoading}>
              Create
            </Button>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default React.forwardRef(CreateBlogForm);
