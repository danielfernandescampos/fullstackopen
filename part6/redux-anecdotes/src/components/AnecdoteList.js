import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  setNotification,
  showNotification,
  voteAnecdote,
} from "../reducers/reducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter))
  const dispatch = useDispatch();
  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted on "${content}"`));
    dispatch(showNotification());
    setTimeout(() => dispatch(hideNotification()), 3000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
