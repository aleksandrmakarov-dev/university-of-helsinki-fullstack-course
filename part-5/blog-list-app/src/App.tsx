import { FormEventHandler, useEffect, useRef, useState } from 'react';
import ToastData from './models/toast-data';
import { v4 as uuidv4 } from 'uuid';
import ToastList from './components/toast-list/toast-list';
import BlogItem from './components/blog-item/blog-item';
import BlogForm from './components/blog-form/blog-form';
import UserItem from './components/user-item/user-item';
import LoginForm from './components/login-form/login-form';
import User from './models/user';
import authService from './services/auth-service';
import Blog from './models/blog';
import blogService from './services/blog-service';
import BlogCreateRequest from './models/blog-create-request';

const App = () => {

  const [blogs,setBlogs] = useState<Blog[]>([]);

  const [toasts,setToasts] = useState<ToastData[]>([]);
  const toastsRef = useRef<ToastData[]>([]);

  const [username, setUsername] = useState<string>('');
  const OnUsernameChange:FormEventHandler<HTMLInputElement> = (e) => setUsername(e.currentTarget.value);

  const [password, setPassword] = useState<string>('');
  const OnPasswordChange:FormEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

  const [user,setUser] = useState<User | null>(null);

  const [title, setTitle] = useState<string>('');
  const OnTitleChange:FormEventHandler<HTMLInputElement> = (e) => setTitle(e.currentTarget.value);
  const [author, setAuthor] = useState<string>('');
  const OnAuthorChange:FormEventHandler<HTMLInputElement> = (e) => setAuthor(e.currentTarget.value);
  const [url, setUrl] = useState<string>('');
  const OnUrlChange:FormEventHandler<HTMLInputElement> = (e) => setUrl(e.currentTarget.value);

  useEffect(() => {
    const populateBlogsAsync = async () =>{
      try{
        const response:Blog[] = await blogService.getAll();
        setBlogs(response);
      }catch(ex:any){
        addToast('Receive blogs', 'Could not receive blogs from server','error',5000);
      }
    }

    populateBlogsAsync();
  },[]);

  useEffect(() => {
    toastsRef.current = toasts;
  },[toasts]);

  useEffect(() => {
    const json = window.localStorage.getItem('user');
    if(json){
      const userObject:User = JSON.parse(json);
      setUser(userObject);
      blogService.setToken(userObject.token); 
    }
  },[]);

  const addToast = (title:string, text:string, type:'success' | 'error', timeout:number) =>{
    
    const timer:NodeJS.Timeout = setTimeout(() => {
      OnToastClose(newToast.id);
      clearTimeout(timer);
    }, (timeout));
    
    const newToast:ToastData = {
      id:uuidv4(),
      title,
      text,
      type,
      timer
    };
    setToasts(toasts.concat(newToast));
  }

  const OnToastClose = (id:string) =>{

    const toast = toastsRef.current.find((toast:ToastData) => toast.id === id);
    clearTimeout(toast?.timer);

    const filteredToasts = toastsRef.current.filter((toast:ToastData) => toast.id !== id);
    setToasts(filteredToasts);
  }

  const OnLoginFormSubmit:FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    try{
      const user:User = await authService.login({
        username,
        password
      });

      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('user',JSON.stringify(user));

      setUsername('');
      setPassword('');
      addToast('Log in account','Successfully logged in','success',5000);
    }catch(ex){
      addToast('Log in account','Invalid username or password','error',5000);
    }
  }

  const OnLogoutClick = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  const OnBlogFormSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const request:BlogCreateRequest = {
      title,
      author,
      url
    };
    try{
      const response:Blog = await blogService.create(request); 
      setBlogs(blogs.concat(response));
      setTitle('');
      setAuthor('');
      setUrl('');
      addToast('Create new blog','New blog has been created successfully','success',5000);
    }catch(ex:any){
      addToast('Create new blog',ex.response.data.error,'error',5000);
    }
  }

  return(
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-5xl mx-auto flex flex-col gap-y-4'>
        <LoginForm user={user} 
          username={username} 
          password={password} 
          onUsernameChange={OnUsernameChange} 
          onPasswordChange={OnPasswordChange} 
          onFormSubmit={OnLoginFormSubmit}
        />
        <UserItem user={user} onLogoutClick={OnLogoutClick}/>
        <div className='border-b border-gray-200 py-2'>
          <h1 className='text-3xl'>Blogs</h1>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {blogs.map((blog:Blog) => <BlogItem key={blog.id} data={blog}/>)}
        </div>
        <ToastList data={toasts} OnToastClose={OnToastClose}/>
        <BlogForm user={user} 
          title={title} 
          author={author} 
          url={url} 
          onTitleChange={OnTitleChange} 
          onAuthorChange={OnAuthorChange} 
          onUrlChange={OnUrlChange} 
          onFormSubmit={OnBlogFormSubmit}
        />
      </div>
    </div>
  )
}

export default App;
