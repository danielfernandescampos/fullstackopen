import { useDispatch, useSelector } from "react-redux";
import { addVote, sendNotification } from "../reducers/reducer";

const AnecdoteList = () => {
  const style = {
    margin: "5px",
  };

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toUpperCase().includes(filter)
  );
  const dispatch = useDispatch();
  const vote = async (id, content, votes) => {
    dispatch(addVote(id, content, votes));
    dispatch(sendNotification(`you voted '${content}'`, 2000));
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
