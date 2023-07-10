import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import anecdoteService from '../services/anecdote-service';

export interface AnecdoteData {
  id: number;
  content: string;
  votes: number;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

// const initialAnecdotes: string[] = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

const generatedId = () => Number((1000000 * Math.random()).toFixed(0));

// const toAndecdoteData = (content: string): AnecdoteData => {
//   return {
//     id: generatedId(),
//     content,
//     votes: 0,
//   };
// };

// const initialState = initialAnecdotes.map(toAndecdoteData);
const initialState: AnecdoteData[] = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    updateAnecdote(state, action: PayloadAction<AnecdoteData>) {
      return state.map(a => (a.id === action.payload.id ? action.payload : a));
    },

    appendAnecdote(state, action: PayloadAction<AnecdoteData>) {
      state.push(action.payload);
    },

    setAnecdotes(state, action: PayloadAction<AnecdoteData[]>) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch: AppDispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content: string) => {
  return async (dispatch: AppDispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const anecdoteToUpdate = await anecdoteService.getById(id);
    if (anecdoteToUpdate) {
      const votedForData: AnecdoteData = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      const response = await anecdoteService.update(id, votedForData);
      dispatch(updateAnecdote(votedForData));
    }
  };
};

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
