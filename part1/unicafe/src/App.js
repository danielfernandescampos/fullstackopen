import { useState } from "react";
import "./App.css";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const Feedback = (props) => {
  return (
    <>
      <td>{props.name}</td>
      <td>{props.count}</td>
    </>
  );
};

const Statistics = (props) => {
  if (props.total) {
    return (
      <>
        <h1>statistcs</h1>
        <table>
          <tbody>
            <tr><Feedback name={"good"} count={props.goodFb}></Feedback></tr>
            <tr><Feedback name={"neutral"} count={props.neutralFb}></Feedback></tr>
            <tr><Feedback name={"bad"} count={props.badFb}></Feedback></tr>
            <tr><Feedback name={"all"} count={props.total}></Feedback></tr>
            <tr><Feedback name={"average"} count={props.average}></Feedback></tr>
            <tr><Feedback name={"positive"} count={`${props.positive}%`}></Feedback></tr>
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <h1>statistcs</h1>
      <p>no feedback given</p>
    </>
  );
};

const App = () => {
  const [goodFb, setGoodFb] = useState(0);
  const [neutralFb, setNeutralFb] = useState(0);
  const [badFb, setBadFb] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const addGoodFb = () => {
    setGoodFb(goodFb + 1);
    setTotal(total + 1);
    setAverage(roundNumber((goodFb - badFb + 1) / (total + 1)));
    setPositive(roundNumber(((goodFb + 1) / (total + 1)) * 100));
  };
  const addNeutraFb = () => {
    setNeutralFb(neutralFb + 1);
    setTotal(total + 1);
    setAverage(roundNumber((goodFb - badFb) / (total + 1)));
    setPositive(roundNumber((goodFb / (total + 1)) * 100));
  };
  const addBadFb = () => {
    setBadFb(badFb + 1);
    setTotal(total + 1);
    setAverage(roundNumber((goodFb - badFb - 1) / (total + 1)));
    setPositive(roundNumber((goodFb / (total + 1)) * 100));
  };
  const roundNumber = (number) => Math.round(number * 100)/100

  return (
    <div className="App">
      <header className="App-header">
        <h1>give feedback</h1>
        <div className="Button-container">
          <Button handleClick={addGoodFb} name={"good"}></Button>
          <Button handleClick={addNeutraFb} name={"neutral"}></Button>
          <Button handleClick={addBadFb} name={"bad"}></Button>
        </div>
        <Statistics
          goodFb={goodFb}
          neutralFb={neutralFb}
          badFb={badFb}
          total={total}
          average={average}
          positive={positive}
        ></Statistics>
      </header>
    </div>
  );
};

export default App;
