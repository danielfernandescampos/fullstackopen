import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/reducer";

const App = () => {
  const notification =  (state => state.notification.show)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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
