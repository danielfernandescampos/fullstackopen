import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotesService";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteInitialState = anecdotesAtStart.map(asObject);

const orderByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes);
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: anecdoteInitialState,
  reducers: {
    voteAnecdote(state, action) {
      return orderByVotes(
        state.map((anecdote) =>
          anecdote.id !== action.payload
            ? anecdote
            : { ...anecdote, votes: anecdote.votes + 1 }
        )
      );
    },
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    show: false,
  },
  reducers: {
    setNotification(state, action) {
      return { ...state, message: action.payload };
    },
    showNotification(state, action) {
      return { ...state, show: true };
    },
    hideNotification(state, action) {
      return { ...state, show: false };
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const anecdoteReducer = anecdoteSlice.reducer;
export const { voteAnecdote, newAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export const notificationReducer = notificationSlice.reducer;
export const { setNotification, showNotification, hideNotification } =
  notificationSlice.actions;
export const filterReducer = filterSlice.reducer;
export const { setFilter, resetFilter } = filterSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdotesService.createAnecdote(content);
    dispatch(newAnecdote(response));
  };
};

export const addVote = (id, content, votes) => {
  return async (dispatch) => {
    const response = await anecdotesService.voteAnecdote(votes + 1, id);
    dispatch(voteAnecdote(response.id));
  };
};

export const sendNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    dispatch(showNotification());
    setTimeout(() => dispatch(hideNotification()), time);
  };
};
