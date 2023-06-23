import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './blog-form';

describe('test blog-form', () => {
  test('check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'www.react.com',
    };

    const createNewBlogMock = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<BlogForm onCreateNewBlog={createNewBlogMock} />);
    const inputTitleElement = screen.getByTestId('input-title');
    const inputAuthorElement = screen.getByTestId('input-author');
    const inputUrlElement = screen.getByTestId('input-url');
    const submitBtnElement = screen.getByText('Save');

    await user.type(inputTitleElement, blog.title);
    await user.type(inputAuthorElement, blog.author);
    await user.type(inputUrlElement, blog.url);
    await user.click(submitBtnElement);

    expect(createNewBlogMock.mock.calls).toHaveLength(1);
    expect(createNewBlogMock.mock.calls[0][0].title).toBe(blog.title);
  });
});
