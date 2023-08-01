import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ListGroup, Spinner } from 'flowbite-react';
import UserService from '../services/UserService';
import UserData from '../interfaces/UserData';
import BlogData from '../interfaces/BlogData';

const UserPage = () => {
  const userPageParams = useParams();
  const userId = userPageParams.id;

  const { data, isLoading: isUserLoading, isError: isUserError } = useQuery('users', UserService.getAll);

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

  const foundUser = data.find((u: UserData) => u.id === userId);

  if (!foundUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">{foundUser.name}</h2>
      <h5 className="text-xl block mb-2">Added blogs</h5>
      {foundUser.blogs.length > 0 ? (
        <ListGroup>
          {foundUser.blogs.map((b: BlogData) => (
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
