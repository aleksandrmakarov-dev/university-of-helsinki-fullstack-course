import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../../models/blog';
import User from '../../models/user';
import BlogItem from './blog-item';

let blog: Blog;

beforeEach(() => {
  const user: User = {
    id: '',
    username: '',
    name: '',
  };
  blog = {
    id: '',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 10,
    url: 'www.react.com',
    user,
  };
});

describe('blog item tests', () => {
  test('renders blog title and author, but does not render url and number of likes by default', async () => {
    const onUpdateMock = jest.fn();
    const onRemoveMock = jest.fn();

    const { container } = render(
      <BlogItem data={blog} isAuthorized={true} onUpdate={onUpdateMock} onRemove={onRemoveMock} />
    );

    const title = screen.getByText(blog.title);
    expect(title).toBeDefined();
    const author = screen.getByText(blog.author, { exact: false });
    expect(author).toBeDefined();

    const contentElement = screen.getByTestId('toggleContainer');

    expect(contentElement).toHaveStyle('display: none');
  });

  test('when button pressed, show URL and likes', async () => {
    const onUpdateMock = jest.fn();
    const onRemoveMock = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <BlogItem data={blog} onUpdate={onUpdateMock} isAuthorized={true} onRemove={onRemoveMock} />
    );

    const toggleButton = screen.getByTestId('toggleBtn');

    await user.click(toggleButton);

    expect(toggleButton).toBeDefined();
    const contentElement = screen.getByTestId('toggleContainer');
    expect(contentElement).not.toHaveStyle('display: none');
  });

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const onUpdateMock = jest.fn();
    const onRemoveMock = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <BlogItem data={blog} onUpdate={onUpdateMock} isAuthorized={true} onRemove={onRemoveMock} />
    );

    const likeBtnElement = container.querySelector('.like-btn');
    expect(likeBtnElement).not.toBeNull();
    if (likeBtnElement === null) {
      return;
    }
    await user.click(likeBtnElement);
    await user.click(likeBtnElement);
    expect(onUpdateMock.mock.calls).toHaveLength(2);
  });
});
