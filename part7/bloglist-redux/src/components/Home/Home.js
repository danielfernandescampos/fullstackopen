import { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import Login from "../Login/Login"
import { setLoggedUser } from "../../reducers/reducer"
import blogService from "../../services/blogs"
import { Button } from "react-bootstrap"

const Home = (props) => {
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
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    right: 0,
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
          <strong>{`${user.name} `}</strong> is logged in
          <Button id="logout-button" onClick={handleLogout} variant="secondary" className="m-2">
            Log out
          </Button>
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
