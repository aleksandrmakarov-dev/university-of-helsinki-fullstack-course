import { useDispatch, useSelector } from 'react-redux';
import { AnecdoteData, voteForAnecdote } from '../../reducers/anecdoteReducer';
import { AppState } from '../../store';
import { useAppDispatch } from '../../hooks';
import { setNotification, setNotificationContent } from '../../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotesData: AnecdoteData[] = useSelector((state: AppState) => {
    if (state.filter === '') {
      return state.anecdotes;
    }

    return state.anecdotes.filter((v: AnecdoteData) => v.content.toLowerCase().includes(state.filter.toLowerCase()));
  });

  const dispatch = useAppDispatch();

  const onVote = (anecdote: AnecdoteData) => {
    dispatch(voteForAnecdote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  const sortedArray = [...anecdotesData].sort((a: AnecdoteData, b: AnecdoteData) => b.votes - a.votes);

  return (
    <div>
      <ul>
        {sortedArray.map((anecdote: AnecdoteData) => (
          <li key={anecdote.id}>
            <p>{anecdote.content}</p>
            <p>
              has {anecdote.votes} <button onClick={() => onVote(anecdote)}>Vote</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
