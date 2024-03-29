import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Table striped>
        <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>{anecdote.author}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AnecdoteList;
