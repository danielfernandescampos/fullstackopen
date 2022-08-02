import { createSlice } from "@reduxjs/toolkit";

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
      return action.payload
    }
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
      return {...state, message: action.payload};
    },
    showNotification(state, action) {
      return {...state, show: true};
    },
    hideNotification(state, action) {
      return {...state, show: false};
    }
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
});

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     data: id
//   }
// }

// export const newAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'VOTE':
//       return orderByVotes(state.map(anecdote => anecdote.id !== action.data
//         ? anecdote : {...anecdote, votes: anecdote.votes +1}))
//     case 'NEW_ANECDOTE':
//       return state.concat(action.data)
//     default:
//         return state
//   }
//   // console.log('state now: ', state)
//   // console.log('action', action)
// }

// export default reducer

export const anecdoteReducer = anecdoteSlice.reducer;
export const { voteAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;
export const notificationReducer = notificationSlice.reducer;
export const { setNotification, showNotification, hideNotification } = notificationSlice.actions;
export const filterReducer = filterSlice.reducer;
export const { setFilter, resetFilter } = filterSlice.actions;
