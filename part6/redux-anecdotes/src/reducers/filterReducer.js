export const FILTER = 'FILTER'

const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return action.string;
    default:
      return state;
  }
};

export default filterReducer;