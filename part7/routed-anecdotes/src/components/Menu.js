import { Nav, Navbar } from "react-bootstrap"
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
      <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/">anecdotes</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/create">create new</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/about">about</Link>
        </Nav.Link>
      </Navbar>
      <Routes>
      <Route style={padding} path="/about" element={<About />} />
      <Route style={padding} path="/create" element={<CreateNew addNew={addNew} setNotification={notification}/>} />
      <Route style={padding} path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
      <Route path="/anecdote/:id" element={<Anecdote anecdote={anecdoteSelected} />} />
  </Routes>
  </>
    )
  }

  export default Menu