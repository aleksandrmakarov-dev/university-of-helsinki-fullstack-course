import { useDispatch, useSelector } from 'react-redux';
import { AnecdoteData, voteFor } from '../../reducers/anecdoteReducer';
import { AppState } from '../../store';

const AnecdoteList = () => {
  const anecdotesData: AnecdoteData[] = useSelector((state: AppState) => {
    if (state.filter === '') {
      return state.anecdotes;
    }

    return state.anecdotes.filter((v: AnecdoteData) => v.content.toLowerCase().includes(state.filter.toLowerCase()));
  });
  const dispatch = useDispatch();

  const onVote = (id: number) => {
    dispatch(voteFor(id));
  };

  const sortedArray = [...anecdotesData].sort((a: AnecdoteData, b: AnecdoteData) => b.votes - a.votes);

  return (
    <div>
      <ul>
        {sortedArray.map((anecdote: AnecdoteData) => (
          <li key={anecdote.id}>
            <p>{anecdote.content}</p>
            <p>
              has {anecdote.votes} <button onClick={() => onVote(anecdote.id)}>Vote</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
