import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { setAnecdotes } from "./reducers/reducer";
import anecdotesService from "./services/anecdotesService";

const App = () => {
  const notification = useSelector(state => state.notification.show)
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll()
    .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 
  return (
    <div>
      <h2>Anecdotes</h2>
      { notification && <Notification /> }
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
