import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../services/library-graphql-queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const books = useQuery(ALL_BOOKS, { variables: { genre } });

  if (books.loading) return <div>loading....</div>;
  if (!props.show) return null;

  return (
    <div>
      <h2>books</h2>
      <div>
        <button onClick={() => setGenre("")}>all</button>
        <button onClick={() => setGenre("novel")}>novel</button>
        <button onClick={() => setGenre("philosophical novel")}>philosophical novel</button>
        <button onClick={() => setGenre("science fiction")}>science fiction</button>
        <button onClick={() => setGenre("political fiction")}>political fiction</button>
        <button onClick={() => setGenre("fable")}>fable</button>
        <button onClick={() => setGenre("satire")}>satire</button>
        <button onClick={() => setGenre("teste")}>teste</button>
      </div>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books &&
            books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author?.name || "-"}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
