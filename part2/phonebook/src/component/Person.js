const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </p>
  );
};

export default Person;
