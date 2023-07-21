import { useQuery } from 'react-query';
import AnecdoteForm from './components/anecdote-form';
import Notification from './components/notification';
import { getAnecdotes } from './requests';

export interface AnecdoteData {
  id?: string;
  content: string;
  votes: 0;
}

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleVote = (anecdote: AnecdoteData) => {
    console.log('vote');
  };

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote: AnecdoteData) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
