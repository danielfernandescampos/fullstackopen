import { useState } from "react";
import "./App.css";

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [mostVoted, setMostVoted] = useState(0);

  const handleClick = () => setSelected(Math.floor(Math.random() * 7));
  const handleVote = () => {
    const copy = [...point];
    copy[selected] += 1;
    setPoint(copy);
    copy.forEach((item, index) => {
      if (item > point[mostVoted]) {
        setMostVoted(index);
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anecdote of the day</h1>
        <i>"{anecdotes[selected]}"</i>
        <p>has {point[selected]} votes</p>
        <div className="Button__container">
          <button onClick={handleClick}>Next anecdote</button>
          <button onClick={handleVote}>Vote</button>
        </div>
        <h2>Anecdote with most votes</h2>
        <i>"{anecdotes[mostVoted]}"</i>
        <p>has {point[mostVoted]} votes</p>
      </header>
    </div>
  );
}

export default App;
