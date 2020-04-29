import anecdoteService from "../services/anecdoteService";
import { ADD_VOTE, NEW_ANECDOTE, INIT_ANECDOTES } from '../reducers/anecdoteReducer'

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.addVote(anecdote);
    dispatch({ type: ADD_VOTE, id: data.id });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content);
    dispatch({ type: NEW_ANECDOTE, data });
  };
};

export const initializeAnecdotes = (data) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes,
    });
  };
};