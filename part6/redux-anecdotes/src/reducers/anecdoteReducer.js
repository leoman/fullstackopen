export const ADD_VOTE = "ADD_VOTE"
export const NEW_ANECDOTE = "NEW_ANECDOTE"
export const INIT_ANECDOTES = "INIT_ANECDOTES"

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_VOTE:
      const anecdoteIndex = state.findIndex((el) => el.id === action.id);
      const newState = [...state];
      newState[anecdoteIndex].votes += 1;
      return newState;

    case NEW_ANECDOTE:
      return state.concat(action.data);

    case INIT_ANECDOTES:
      return action.data;

    default:
      return state;
  }
};

export default anecdotesReducer;