import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ListGroup, Spinner } from 'flowbite-react';
import UserService from '../services/UserService';
import UserData from '../interfaces/UserData';
import BlogData from '../interfaces/BlogData';

const UserPage = () => {
  const userPageParams = useParams();
  const userId = userPageParams.id ?? '';

  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<UserData>('user', () => UserService.getById(userId));

  if (isUserLoading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  }

  if (!data || isUserError || !userId) {
    return <div>Failed while fetching data</div>;
  }

  if (!data) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">{data.name}</h2>
      <h5 className="text-xl block mb-2">Added blogs</h5>
      {data.blogs.length > 0 ? (
        <ListGroup>
          {data.blogs.map((b: BlogData) => (
            <ListGroup.Item key={b.id} href={`/blogs/${b.id}`}>
              {b.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default UserPage;
