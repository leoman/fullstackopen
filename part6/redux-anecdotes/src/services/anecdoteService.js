import axios from "axios";

export const getRandomId = () => (100000 * Math.random()).toFixed(0);

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = { content, id: getRandomId(), votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const addVote = async (anecdote) => {
  const newAnecdote = { ...anecdote };
  newAnecdote.votes += 1;
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote);
  return response.data;
};

export default { getAll, createNew, addVote };