import { connect } from "react-redux";
import { addVote, sendNotification } from "../reducers/reducer";

const AnecdoteList = (props) => {
  const style = {
    margin: "5px",
  };

  const filteredAnecdotes = props.anecdotes.filter((anecdote) =>
    anecdote.content.toUpperCase().includes(props.filter)
  );
  const vote = async (id, content, votes) => {
    props.addVote(id, content, votes);
    clearTimeout(props.notification.timeoutID)
    props.sendNotification(`you voted '${content}'`, 2000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id} style={style}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              style={style}
              onClick={() =>
                vote(anecdote.id, anecdote.content, anecdote.votes)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  };
};

const mapDispatchToProps = {
  addVote,
  sendNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
