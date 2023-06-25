/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NoteForm from './note-form';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm createNewNote={createNote} isAuthorized={true} />);

  screen.debug();

  const input = screen.getByRole('textbox');
  const sendButton = screen.getByText('Save');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  console.log(createNote.mock.calls);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
});
