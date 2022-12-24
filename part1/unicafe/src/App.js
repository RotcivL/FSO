import { useState } from "react";
const Header = (props) => <h1>{props.header}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Display = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header header={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <Header header={"statistics"} />
      <Display text={"good"} value={good} />
      <Display text={"neutral"} value={neutral} />
      <Display text={"bad"} value={bad} />
    </div>
  );
};

export default App;
