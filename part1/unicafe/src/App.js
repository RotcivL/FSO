import { useState } from "react";
const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <div>
        <Header header={"statistics"} />
        No feedback given
      </div>
    );
  }
  return (
    <div>
      <Header header={"statistics"} />
      <Display text={"good"} value={good} />
      <Display text={"neutral"} value={neutral} />
      <Display text={"bad"} value={bad} />
      <Display text={"all"} value={total} />
      <Display text={"average"} value={(good - bad) / total} />
      <Display text={"positive"} value={(good * 100) / total + "%"} />
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
