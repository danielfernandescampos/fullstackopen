import "./App.css"
import { useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Login from "./components/Login"
import Message from "./components/Message"
import NewBlog from "./components/NewBlog"
import blogService from "./services/blogs"
import Togglable from "./components/Togglable"
import { connect, useDispatch } from "react-redux"
import { initializeBlogs, setUser } from "./reducers/reducer"

const App1 = (props) => {
  const blogRef = useRef()
  const user = props.user
  const notification = props.notification

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      console.log(loggedUser)
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
  }

  // const handleSort = () => {
  //   const blogs2 = Array.from(blogs)
  //   const orderByLikes = blogs2.sort(function (a, b) {
  //     return b.likes - a.likes
  //   })
  //   setBlogs(orderByLikes)
  // }

  return (
    <div>
      <h2>blogs page</h2>
      {!user ? (
        <Login />
      ) : (
        <div>
          <button id="logout-button" onClick={handleLogout}>
            Log out
          </button>
          <p>
            <strong>{user.name}</strong> is logged in
          </p>
          <Togglable buttonLabel="New blog" ref={blogRef}>
            <NewBlog />
          </Togglable>
          <br></br>
          <h3>blogs list</h3>
          {/* <button onClick={handleSort}>sort by likes</button> */}
          <br></br>
          <Blogs/>
        </div>
      )}
      {notification.show && <Message notification={notification} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification,
  }
}

const App = connect(mapStateToProps)(App1)

export default App
