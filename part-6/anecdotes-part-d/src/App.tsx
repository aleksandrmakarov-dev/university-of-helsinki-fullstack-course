import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/anecdote-form';
import Notification from './components/notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch, useNotify } from './notification-context';

export interface AnecdoteData {
  id?: string;
  content: string;
  votes: number;
}

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const queryClient = useQueryClient();

  const notify = useNotify();

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote: AnecdoteData) => {
      const anecdotes: AnecdoteData[] = queryClient.getQueryData('anecdotes') ?? [];
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map((anecdote: AnecdoteData) => (anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
      );
    },
  });

  const handleVote = (anecdote: AnecdoteData) => {
    console.log('vote');
    const updatedAnecdote: AnecdoteData = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(updatedAnecdote, {
      onSuccess: (data: AnecdoteData) => {
        notify(`anecdote '${data.content}' voted`);
      },
    });
  };

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const sorted = result.data.sort((a: AnecdoteData, b: AnecdoteData) => b.votes - a.votes);
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {sorted.map((anecdote: AnecdoteData) => (
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
