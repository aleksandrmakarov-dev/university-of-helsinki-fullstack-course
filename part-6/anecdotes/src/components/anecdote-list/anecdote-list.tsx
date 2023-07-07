import { useDispatch, useSelector } from 'react-redux';
import { AnecdoteData, voteForAnecdoteAction } from '../../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotesData = useSelector((state: AnecdoteData[]) => state);
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
