import { connect, useDispatch } from "react-redux"
import {
  addLike,
  sendNotification,
  handleDelete,
  initializeBlogs,
} from "../reducers/reducer"
import { useEffect, useRef, useState } from "react"
import Togglable from "./Togglable"
import ConnectedNewBlog from "./NewBlog"

const Blogs = (props) => {
  const blogs = props.blogs
  const user = props.user
  const blogRef = useRef()
  const [showDetails, setShowDetails] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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
  // const handleSort = () => {
  //   const blogs2 = Array.from(blogs)
  //   const orderByLikes = blogs2.sort(function (a, b) {
  //     return b.likes - a.likes
  //   })
  //   setBlogs(orderByLikes)
  // }
  return (
    <>
      <Togglable buttonLabel="New blog" ref={blogRef}>
        <ConnectedNewBlog />
      </Togglable>
      <br></br>
      <h3>blogs list</h3>
      {/* <button onClick={handleSort}>sort by likes</button> */}
      <br></br>
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

export default ConnectedBlog
