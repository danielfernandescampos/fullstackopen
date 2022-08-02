import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  setNotification,
  showNotification,
  voteAnecdote,
} from "../reducers/reducer";
import anecdotesService from "../services/anecdotesService";

const AnecdoteList = () => {
  const style = {
    margin: '5px'
  };

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toUpperCase().includes(filter)
  );
  const dispatch = useDispatch();
  const vote = async (id, content, votes) => {
    const response = await anecdotesService.voteAnecdote(votes + 1, id);
    dispatch(voteAnecdote(response.id));
    dispatch(setNotification(`you voted on "${content}"`));
    dispatch(showNotification());
    setTimeout(() => dispatch(hideNotification()), 3000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id} style={style}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              style={style}
              onClick={() =>
                vote(anecdote.id, anecdote.content, anecdote.votes)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
