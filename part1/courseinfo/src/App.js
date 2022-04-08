const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.parts.map(part => (
      <Part name={part.name} exercises={part.exercises} />
    ))}
    {/* <Part parts={props.parts.part2} exercises={props.exercises.exercises2} />
    <Part parts={props.parts.part3} exercises={props.exercises.exercises3} /> */}
  </>
);

const Total = (props) => (
  <p>
    Number of exercises {props.parts.reduce((acc, crr) => crr.exercises + acc, 0)}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
