import React, { FC, FormEventHandler, useState } from 'react';
import './blog-form.css';
import BlogCreateRequest from '../../models/blog-create-request';

interface BlogFormProps {
  onCreateNewBlog: (obj: BlogCreateRequest) => Promise<boolean>;
}

const BlogForm: FC<BlogFormProps> = ({ onCreateNewBlog }) => {
  const [title, setTitle] = useState<string>('');
  const OnTitleChange: FormEventHandler<HTMLInputElement> = e => setTitle(e.currentTarget.value);
  const [author, setAuthor] = useState<string>('');
  const OnAuthorChange: FormEventHandler<HTMLInputElement> = e => setAuthor(e.currentTarget.value);
  const [url, setUrl] = useState<string>('');
  const OnUrlChange: FormEventHandler<HTMLInputElement> = e => setUrl(e.currentTarget.value);

  const OnBlogFormSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const request: BlogCreateRequest = {
      title,
      author,
      url,
    };
    const result = await onCreateNewBlog(request);
    if (result) {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <div className="bg-white border-gray-200 border rounded-sm shadow-sm p-4">
      <h1 className="text-xl font-semibold mb-2">Blog form</h1>
      <form className="grid grid-cols-2 gap-2" onSubmit={OnBlogFormSubmit}>
        <div>
          <label className="mb-1 text-gray-600 block">Title</label>
          <input
            data-testid="input-title"
            value={title}
            onChange={OnTitleChange}
            className="block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200"
            placeholder="e.g. My first project..."
          />
        </div>
        <div>
          <label className="mb-1 text-gray-600 block">Author</label>
          <input
            data-testid="input-author"
            value={author}
            onChange={OnAuthorChange}
            className="block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200"
            placeholder="e.g. Dan Abramov"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-1 text-gray-600 block">Url</label>
          <input
            data-testid="input-url"
            value={url}
            onChange={OnUrlChange}
            className="block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200"
            placeholder="e.g. https://react.dev/"
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            className="rounded-sm text-sm font-semibold transition-colors px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-200"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
