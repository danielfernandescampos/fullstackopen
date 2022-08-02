import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/reducer";
import anecdotesService from "../services/anecdotesService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const createdAnecdote = {
      content: anecdote,
      votes: 0,
    };
    event.target.anecdote.value = "";
    const response = await anecdotesService.createAnecdote(createdAnecdote)
    dispatch(newAnecdote(response));
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
