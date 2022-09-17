import { connect } from "react-redux"
import { addLike, sendNotification, handleDelete } from "../reducers/reducer"
import { useState } from "react"

const Blogs = (props) => {
  const blogs = props.blogs
  const user = props.user
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  const handleLike = (blog) => {
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const updatedBlog = { ...blog, likes: newLikes }
    props.addLike(updatedBlog);
  }
  const handleDelete = (id) => {
    props.handleDelete(id)
  }

  return (
    <>
      {blogs.map((blog) => (
        <li key={blog.id} className="blog">
          {blog.title} <button onClick={handleShowDetails}>view</button>
          {showDetails && (
            <div className="blog-details">
              <p>author: {blog.author || "-"}</p>
              <p>url: {blog.url || "-"}</p>
              <p>likes: {blog.likes}</p>
              <button id="like-button" onClick={() => handleLike(blog)}>
                like
              </button>
              {user.username === blog.user?.username && (
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
        </li>
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
  }
}

const mapDispatchToProps = {
  sendNotification,
  addLike,
  handleDelete,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blogs)

export default ConnectedBlog;
