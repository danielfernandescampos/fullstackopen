import { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addLike, handleDelete } from "../reducers/reducer"

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
    <div className="blog">
      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      <button onClick={handleShowDetails}>view</button>
      {showDetails && (
        <div className="blog-details">
          <p>author: {blog.author || "-"}</p>
          <p>url: {blog.url || "-"}</p>
          <p>likes: {blog.likes}</p>
          <button id="like-button" onClick={() => handleLike(blog)}>
            like
          </button>
          {loggedUser.username === blog.user?.username && (
            <button
              id="delete-button"
              onClick={() => handleDelete(blog.id)}
              style={{ background: "#FA7b6c" }}
            >
              delete
            </button>
          )}
        </div>
      )}
    </div>
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
