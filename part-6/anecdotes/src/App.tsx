import AnecdoteForm from './components/anecdote-form/anecdote-form';
import AnecdoteList from './components/anecdote-list/anecdote-list';
import Filter from './components/filter/filter';
import Notification from './components/notification/notification';

const App = () => {
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
