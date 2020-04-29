import { FILTER } from '../reducers/filterReducer'

export const filterAnecdotes = (string) => {
  return {
    type: FILTER,
    string,
  };
};