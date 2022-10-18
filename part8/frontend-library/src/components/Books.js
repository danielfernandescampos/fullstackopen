import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../services/library-graphql-queries"

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const [showBooks, setShowBooks] = useState([])
  
  useEffect(() => {
    const filteredBooks = books.data?.allBooks.filter(book => book.genres.includes(genre))
    setShowBooks(filteredBooks)
    if(!genre) setShowBooks(books.data?.allBooks)
  }, [genre, books])
  
  if(books.loading) return <div>loading....</div>
  if (!props.show) return null

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
      </div>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {showBooks && showBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name || '-'}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
