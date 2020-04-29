import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import anecdoteReducer from "./anecdoteReducer";
import messageReducer from "./messageReducer";
import filterReducer from "./filterReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer,
  filter: filterReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;