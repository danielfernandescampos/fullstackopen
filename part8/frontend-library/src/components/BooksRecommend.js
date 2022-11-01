import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../services/library-graphql-queries"

const BooksRecommend = (props) => {

  const favouriteGenre = props.user.data.me.favouriteGenre
  const books = useQuery(ALL_BOOKS)
  const booksShow = books.data?.allBooks.filter(
    book => book.genres.includes(favouriteGenre)
  )

  if (!props.show) return null

  return (
    <div>
      <h2>books</h2>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksShow.map((a) => (
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

export default BooksRecommend
