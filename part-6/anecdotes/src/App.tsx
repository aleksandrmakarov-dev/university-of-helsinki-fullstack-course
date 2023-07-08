import AnecdoteForm from './components/anecdote-form/anecdote-form';
import AnecdoteList from './components/anecdote-list/anecdote-list';
import Filter from './components/filter/filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};
export default App;
