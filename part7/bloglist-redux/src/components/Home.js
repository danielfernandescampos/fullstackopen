import { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import Login from "../components/Login"
import { setUser } from "../reducers/reducer"
import blogService from "../services/blogs"

const Home = (props) => {
  const user = props.user
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const style = {
    display: "flex"
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
  }

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div style={style}>
          <p>
            <strong>{user.name}</strong> is logged in
          </p>
          <button id="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const HomeConnected = connect(mapStateToProps)(Home)

export default HomeConnected
