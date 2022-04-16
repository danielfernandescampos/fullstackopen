const Filter = (props) => {

  return (
    <form>
      <p>Search:</p>
      <div>
        <input onChange={props.onSearch} />
      </div>
    </form>
  );
};

export default Filter;
