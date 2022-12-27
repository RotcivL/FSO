const ShowButton = ({ onClick, country }) => {
  return (
    <div>
      {country.name}
      <button onClick={onClick}>show</button>
    </div>
  );
};

export default ShowButton;
