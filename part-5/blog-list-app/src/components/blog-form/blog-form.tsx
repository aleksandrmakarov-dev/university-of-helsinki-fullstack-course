import React, { FC, FormEventHandler } from 'react';
import './blog-form.css';
import User from '../../models/user';

interface BlogFormProps {
  user:User | null;
  title: string;
  author: string;
  url: string;
  onTitleChange:FormEventHandler<HTMLInputElement>;
  onAuthorChange:FormEventHandler<HTMLInputElement>;
  onUrlChange:FormEventHandler<HTMLInputElement>;
  onFormSubmit:FormEventHandler<HTMLFormElement>;
}

const BlogForm: FC<BlogFormProps> = ({user,title,author,url,onTitleChange,onAuthorChange,onUrlChange,onFormSubmit}) => {
  
  if(!user)
    return null;

  return(
    <div className="bg-white border-gray-200 border rounded-sm shadow-sm p-4">
      <h1 className='text-xl font-semibold mb-2'>Blog form</h1>
      <form className='grid grid-cols-2 gap-2' onSubmit={onFormSubmit}>
        <div>
          <label className='mb-1 text-gray-600 block'>Title</label>
          <input value={title} onChange={onTitleChange} className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='e.g. My first project...'/>
        </div>
        <div>
          <label className='mb-1 text-gray-600 block'>Author</label>
          <input value={author} onChange={onAuthorChange} className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='e.g. Dan Abramov'/>
        </div>
        <div className='col-span-2'>
          <label className='mb-1 text-gray-600 block'>Url</label>
          <input value={url} onChange={onUrlChange} className='block w-full px-2.5 py-1.5 text-gray-600 bg-gray-50 rounded-sm outline-none border border-gray-300 focus:border-blue-400 focus:ring-4 transition-all placeholder:text-gray-400 focus:ring-blue-200' placeholder='e.g. https://react.dev/'/>
        </div>
        <div className='col-span-2 flex justify-end'>
          <button className='rounded-sm text-sm font-semibold transition-colors px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-200' type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
};

export default BlogForm;
