import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/reducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const newAnecdote = {
      content: anecdote,
      votes: 0,
    };
    event.target.anecdote.value = "";
    dispatch(createAnecdote(newAnecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
      <br></br>
    </>
  );
};

export default AnecdoteForm;
