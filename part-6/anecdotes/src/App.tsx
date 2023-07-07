import AnecdoteForm from './components/anecdote-form/anecdote-form';
import AnecdoteList from './components/anecdote-list/anecdote-list';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};
export default App;
