import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

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
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };
      state.push(newAnecdote);
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
export const { voteAnecdote, newAnecdote } = anecdoteSlice.actions;
export const notificationReducer = notificationSlice.reducer;
export const { setNotification, showNotification, hideNotification } = notificationSlice.actions;
export const filterReducer = filterSlice.reducer;
export const { setFilter, resetFilter } = filterSlice.actions;
