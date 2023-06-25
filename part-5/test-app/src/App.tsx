import { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from './components/note/Note';
import noteService from './services/note-service';
import authService, { User } from './services/auth-service';
import LoginForm from './components/login-form/login-form';
import NoteForm from './components/note-form/note-form';
import UserItem from './components/user-item/user-item';
import ToastList from './components/toast-list/toast-list';
import ToggleContainer, { ToggleHandle } from './components/toggle-container/toggle-container';

export interface INote {
  id: string;
  content: string;
  important: boolean;
}

export interface ToastData {
  id: string;
  title: string;
  text: string;
  type: 'success' | 'error';
  timer: NodeJS.Timeout;
}

const App: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [showAll, setShowAll] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const toastsRef = useRef<ToastData[]>([]);

  const noteFormRef = useRef<ToggleHandle>(null);
  const loginFormRef = useRef<ToggleHandle>(null);

  // login
  const [username, setUsername] = useState<string>('');
  const OnUsernameChange: FormEventHandler<HTMLInputElement> = e => setUsername(e.currentTarget.value);

  const [password, setPassword] = useState<string>('');
  const OnPasswordChange: FormEventHandler<HTMLInputElement> = e => setPassword(e.currentTarget.value);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // const nonExisting = {
    //   id: '1',
    //   content: 'This note is not saved to server',
    //   important: true,
    // }

    const receiveNotes = async () => {
      try {
        const response: INote[] = await noteService.getAll();
        setNotes(response);
      } catch (ex: any) {
        const data = ex.response.data;
        addToast('Receive notes', data.error, 'error', 5000);
      }
    };
    receiveNotes();
  }, []);

  useEffect(() => {
    const json = window.localStorage.getItem('user');
    if (json) {
      const userObject: User | null = JSON.parse(json);
      if (!userObject) {
        return;
      }
      setUser(userObject);
      noteService.setToken(userObject.token);
    }
  }, []);

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const createNewNote = async (noteObject: INote) => {
    try {
      const response: INote = await noteService.create(noteObject);
      setNotes(notes.concat(response));
      addToast('Create new note', 'New note has been created successfully', 'success', 5000);
      noteFormRef?.current?.toggleVisibility();
      return true;
    } catch (ex: any) {
      const data = ex.response.data;
      addToast('Create new note', data.error, 'error', 5000);
    }

    return false;
  };

  const OnShowAllChange: FormEventHandler<HTMLInputElement> = e => {
    console.log('show all changed', e.currentTarget.checked);
    setShowAll(e.currentTarget.checked);
  };

  const OnToggleImportance = async (id: string) => {
    const note = notes.find((n: INote) => n.id === id);
    if (note === undefined) {
      console.log(`could not find note with id = ${id}}`);
      return;
    }
    const changedNote: INote = { ...note, important: !note?.important };

    try {
      const response: INote = await noteService.update(id, changedNote);
      setNotes(notes.map((n: INote) => (n.id !== id ? n : response)));
      addToast('Importance change', 'Importance has been successfully changed', 'success', 2000);
    } catch (ex: any) {
      addToast('Importance change', ex.response.data.error, 'error', 2000);
    }
  };

  const OnLoginFormSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      const authUser: User = await authService.login({
        username,
        password,
      });

      setUser(authUser);
      noteService.setToken(authUser.token);
      window.localStorage.setItem('user', JSON.stringify(authUser));

      setUsername('');
      setPassword('');
      loginFormRef?.current?.toggleVisibility();
      addToast('Log in account', 'Successfully logged in', 'success', 5000);
    } catch (ex) {
      addToast('Log in account', 'Invalid username or password', 'error', 5000);
    }
  };

  const OnLogoutClick = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const addToast = (title: string, text: string, type: 'success' | 'error', timeout: number) => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      OnToastClose(newToast.id);
      clearTimeout(timer);
    }, timeout);

    const newToast: ToastData = {
      id: uuidv4(),
      title,
      text,
      type,
      timer,
    };
    setToasts(toasts.concat(newToast));
  };

  const OnToastClose = (id: string) => {
    const toast = toastsRef.current.find((t: ToastData) => t.id === id);
    clearTimeout(toast?.timer);

    const filteredToasts = toastsRef.current.filter((t: ToastData) => t.id !== id);
    setToasts(filteredToasts);
  };

  const notesToShow: INote[] = showAll ? notes : notes.filter((note: INote) => note.important);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <ToggleContainer
          btnLabel={'Log in'}
          btnPosition={'flex justify-end'}
          btnCancelPosition={'flex justify-center'}
          ref={loginFormRef}
        >
          <LoginForm
            user={user}
            username={username}
            password={password}
            onUsernameChange={OnUsernameChange}
            onPasswordChange={OnPasswordChange}
            onFormSubmit={OnLoginFormSubmit}
          />
        </ToggleContainer>
        <UserItem user={user} onLogoutClick={OnLogoutClick} />

        <div className="border-b pb-2 border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Notes</h1>
          <div className="flex items-center gap-x-2">
            <input
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200 outline-none"
              type="checkbox"
              id="showAll"
              checked={showAll}
              onChange={OnShowAllChange}
            />
            <label className="font-semibold text-sm text-gray-700" htmlFor="showAll">
              Show All
            </label>
          </div>
        </div>
        <ToggleContainer
          btnLabel="New note"
          btnPosition="flex justify-end"
          btnCancelPosition="flex justify-center"
          ref={noteFormRef}
        >
          <NoteForm isAuthorized={user !== null} createNewNote={createNewNote} />
        </ToggleContainer>

        <ul className="flex flex-col gap-y-2">
          {notesToShow.map((note: INote) => (
            <Note key={note.id} note={note} OnToggleImportance={() => OnToggleImportance(note.id)} />
          ))}
        </ul>
      </div>
      <ToastList data={toasts} OnToastClose={OnToastClose} />
    </div>
  );
};

export default App;
