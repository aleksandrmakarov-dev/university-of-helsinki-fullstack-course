import BlogData from './BlogData';

interface UserData {
  id: string;
  username: string;
  name: string;
  blogs: BlogData[];
}

export default UserData;
