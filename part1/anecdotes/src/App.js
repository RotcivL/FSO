import { useState } from "react";

const Header = ({ heading }) => <h1>{heading}</h1>;
const DisplayQuote = ({ quote }) => <div>{quote}</div>;
const DisplayVotes = ({ count }) => <div>has {count} votes</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ heading, quote, count }) => {
  return (
    <div>
      <Header heading={heading} />
      <DisplayQuote quote={quote} />
      <DisplayVotes count={count} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [mostVotesIndex, setIndex] = useState(0);

  const selectRandom = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const addPoint = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    if (copy[selected] > copy[mostVotesIndex]) {
      setIndex(selected);
    }
  };

  return (
    <div>
      <Anecdote
        heading="Anecdote of the day"
        quote={anecdotes[selected]}
        count={points[selected]}
      />
      <Button handleClick={addPoint} text="vote" />
      <Button handleClick={selectRandom} text="next anecdote" />

      <Anecdote
        heading="Anecdote with most votes"
        quote={anecdotes[mostVotesIndex]}
        count={points[mostVotesIndex]}
      />
    </div>
  );
};

export default App;
