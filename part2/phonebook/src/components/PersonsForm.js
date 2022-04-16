const PersonsForm = (props) => {
  return (
    <form>
      <p>Name:</p>
      <div>
        <input onChange={props.nameChange} value={props.nameValue} />
      </div>
      <p>Number:</p>
      <div>
        <input onChange={props.numberChange} value={props.numberValue} />
      </div>
      <div>
        <button type="submit" onClick={props.addButton}>
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonsForm;
