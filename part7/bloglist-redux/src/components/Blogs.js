import { useEffect, useRef } from "react"
import { connect, useDispatch } from "react-redux"
import { initializeBlogs } from "../reducers/reducer"
import ConnectedBlog from "./Blog"
import ConnectedNewBlog from "./NewBlog"
import Togglable from "./Togglable"

const Blogs = (props) => {
  const blogs = props.blogs
  const blogRef = useRef()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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
        <ConnectedBlog
          key={blog.id}
          blog={blog}
        ></ConnectedBlog>
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlogs = connect(mapStateToProps)(Blogs)

export default ConnectedBlogs
