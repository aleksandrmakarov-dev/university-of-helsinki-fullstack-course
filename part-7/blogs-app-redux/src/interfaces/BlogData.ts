import UserData from './UserData';

interface BlogData {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: UserData;
  comments: string[];
}

export default BlogData;
