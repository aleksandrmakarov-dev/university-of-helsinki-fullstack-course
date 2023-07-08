import { Reducer } from 'redux';

export interface AnecdoteData {
  id: string;
  content: string;
  votes: number;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

const initialAnecdotes: string[] = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const generatedId = () => Number(1000000 * Math.random()).toFixed(0);

const toAndecdoteData = (content: string): AnecdoteData => {
  return {
    id: generatedId(),
    content,
    votes: 0,
  };
};

export const addAnecdoteAction = (content: string): ReducerAction => {
  return {
    type: 'ADD',
    payload: toAndecdoteData(content),
  };
};

export const voteForAnecdoteAction = (id: string): ReducerAction => {
  return {
    type: 'VOTE',
    payload: id,
  };
};

const initialState = initialAnecdotes.map(toAndecdoteData);

const anecdoteReducer: Reducer<AnecdoteData[], ReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote: AnecdoteData) =>
        anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      );
    case 'ADD':
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default anecdoteReducer;
