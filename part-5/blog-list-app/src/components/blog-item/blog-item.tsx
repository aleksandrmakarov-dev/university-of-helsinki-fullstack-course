import React, { FC, useState } from 'react';
import './blog-item.css';
import Blog from '../../models/blog';

interface BlogItemProps {
  data:Blog;
}

const BlogItem: FC<BlogItemProps> = ({data}) => {

  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => setVisible(!visible);

  const contentStyle = {'display': visible ? '' : 'none'};

  return(
    <div className='border border-gray-200 bg-white p-4 rounded-sm shadow-sm'>
      <div>
        <button onClick={toggleVisibility} className='flex justify-between items-center gap-2 w-full hover:underline'>
          <p className='text-lg font-semibold'>{data.title}</p>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill='currentColor' viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
        </button>
      </div>
      <div style={contentStyle} className='pt-4'>
        <p className='text-gray-700'>by {data.author}</p>
        <p className='flex gap-1 pb-4'>
          <span>Source: </span>
          <a href={data.url} className='text-gray-500 hover:underline'>{data.url}</a>
        </p>
        <div className='flex items-center justify-between gap-x-4'>
          <div className='flex gap-x-2 items-center text-gray-600'>
            <button className='p-2 rounded-full bg-gray-200 text-gray-600 transition-all hover:bg-pink-200 hover:text-pink-600 focus:ring-4 focus:ring-pink-100'>
              <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' className='w-4 h-4' viewBox="0 0 512 512">
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
              </svg>
            </button>
            <p>{data.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
