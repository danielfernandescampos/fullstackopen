import { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import Login from "../components/Login"
import { setLoggedUser } from "../reducers/reducer"
import blogService from "../services/blogs"

const Home = (props) => {
  console.log(props)
  const user = props.loggedUser
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const style = {
    display: "flex",
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setLoggedUser(null))
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
    loggedUser: state.loggedUser,
  }
}

const HomeConnected = connect(mapStateToProps)(Home)

export default HomeConnected
