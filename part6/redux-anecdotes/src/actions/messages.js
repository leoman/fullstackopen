import { REMOVE_MESSAGE, SHOW_MESSAGE } from '../reducers/messageReducer'

export const messageCreator = (message, delay) => {
  return (dispatch) => {
    const timeOut = setTimeout(() => {
      dispatch({ type: REMOVE_MESSAGE });
    }, delay);
    dispatch({ type: SHOW_MESSAGE, message, timeOut });
  };
};