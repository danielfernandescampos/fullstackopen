import { connect } from "react-redux"
import "./App.css"
import HomeConnected from "./components/Home/Home"
import MenuConnected from "./components/Menu/Menu"
import Message from "./components/Shared/Message"

const App = (props) => {
  const notification = props.notification
  const user = props.loggedUser

  return (
    <>
      <HomeConnected></HomeConnected>
      {user && <MenuConnected></MenuConnected>}
      {notification.show && <Message notification={notification} />}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    loggedUser: state.loggedUser
  }
}

const AppConnected = connect(mapStateToProps)(App)

export default AppConnected
