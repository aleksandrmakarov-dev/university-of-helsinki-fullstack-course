import { useDispatch, useSelector } from 'react-redux';
import { AnecdoteData, voteForAnecdoteAction } from '../../reducers/anecdoteReducer';
import { AppState } from '../..';

const AnecdoteList = () => {
  const anecdotesData: AnecdoteData[] = useSelector((state: AppState) => {
    if (state.filter === '') {
      return state.anecdotes;
    }

    return state.anecdotes.filter((v: AnecdoteData) =>
      v.content.toLocaleLowerCase().includes(state.filter.toLocaleLowerCase())
    );
  });
  const dispatch = useDispatch();

  const onVote = (id: string) => {
    dispatch(voteForAnecdoteAction(id));
  };

  return (
    <div>
      <ul>
        {anecdotesData
          .sort((a: AnecdoteData, b: AnecdoteData) => b.votes - a.votes)
          .map((anecdote: AnecdoteData) => (
            <li>
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
