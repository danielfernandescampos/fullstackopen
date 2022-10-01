import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR } from "../services/library-graphql-mutations";
import { ALL_AUTHORS } from "../services/library-graphql-queries";

const EditAuthor = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born } });

    setBorn("");
    setName("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {props.authors.data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
