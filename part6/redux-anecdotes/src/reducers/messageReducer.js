export const SHOW_MESSAGE = "SHOW_MESSAGE"
export const REMOVE_MESSAGE = "REMOVE_MESSAGE"

const initialState = { message: "", timeOut: null };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      if (state.timeOut) {
        clearInterval(state.timeOut);
      }
      return { message: action.message, timeOut: action.timeOut };
    case REMOVE_MESSAGE:
      return { message: "", timeOut: null };
    default:
      return state;
  }
};



export default messageReducer;