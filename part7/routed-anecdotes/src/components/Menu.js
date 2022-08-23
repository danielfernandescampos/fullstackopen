import { Link, Route, Routes, useMatch } from "react-router-dom"
import About from "./About"
import Anecdote from "./Anecdote"
import AnecdoteList from "./AnecdoteList"
import CreateNew from "./CreateNew"

const Menu = ({addNew, anecdotes, notification}) => {
    const match = useMatch("/anecdote/:id");
    const anecdoteSelected = match
        ? anecdotes.find((x) => x.id === Number(match.params.id))
        : null;
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
         <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
        <Routes>
            <Route style={padding} path="/about" element={<About />} />
            <Route style={padding} path="/create" element={<CreateNew addNew={addNew} setNotification={notification}/>} />
            <Route style={padding} path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
            <Route path="/anecdote/:id" element={<Anecdote anecdote={anecdoteSelected} />} />
        </Routes>
      </div>
    )
  }

  export default Menu