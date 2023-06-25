/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { INote } from '../../App';
import Note from './Note';

test('renders content', async () => {
  const note: INote = {
    id: 'ag21bc8wuxz',
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  render(<Note note={note} OnToggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('Make not important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
