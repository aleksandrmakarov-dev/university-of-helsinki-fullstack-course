import { useQuery } from 'react-query';
import { Spinner, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import UserData from '../interfaces/UserData';
import UserService from '../services/UserService';

const UsersPage = () => {
  const { data, isLoading, isError } = useQuery<UserData[]>('users', UserService.getAll, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  }

  if (isError) {
    return <div>Error while fetching data</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold">Users</h2>
      <div className="py-5">
        <Table className="max-w-xl">
          <Table.Head className="border-b">
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Blogs</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {data?.map((i: UserData) => (
              <Table.Row className="hover:bg-gray-50 border-b last:border-b-0">
                <Table.Cell>
                  <Link className="hover:underline" to={`/users/${i.id}`}>
                    {i.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{i.blogs.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
