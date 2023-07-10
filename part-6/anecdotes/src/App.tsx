import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/anecdote-form/anecdote-form';
import AnecdoteList from './components/anecdote-list/anecdote-list';
import Filter from './components/filter/filter';
import Notification from './components/notification/notification';
import anecdoteService from './services/anecdote-service';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(response => {
        dispatch(setAnecdotes(response));
      })
      .catch(e => console.log(e));
  });

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};
export default App;
