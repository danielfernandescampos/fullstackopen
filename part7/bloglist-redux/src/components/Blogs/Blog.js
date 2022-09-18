import { useState } from "react"
import { Button } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addLike, handleDelete } from "../../reducers/reducer"

const Blog = (props) => {
  const [showDetails, setShowDetails] = useState(false)
  const loggedUser = props.loggedUser // eslint-disable-line
  const blog = props.blog

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  const handleLike = (blog) => {
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const updatedBlog = { ...blog, likes: newLikes }
    props.addLike(updatedBlog)
  }
  const handleDelete = (id) => {
    props.handleDelete(id)
  }
  return (
    <td className="blog">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        <Button
          onClick={handleShowDetails}
          variant="outline-secondary"
        >
          view
        </Button>
      </div>
      {showDetails && (
        <div className="blog-details">
          <p>author: {blog.author || "-"}</p>
          <p>url: {blog.url || "-"}</p>
          <p>likes: {blog.likes}</p>
          <Button id="like-button" onClick={() => handleLike(blog)}>
            like
          </Button>
          {loggedUser.username === blog.user?.username && (
            <Button
              variant="danger"
              id="delete-button"
              onClick={() => handleDelete(blog.id)}
            >
              delete
            </Button>
          )}
        </div>
      )}
    </td>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    loggedUser: state.loggedUser,
  }
}

const mapDispatchToProps = {
  addLike,
  handleDelete,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
