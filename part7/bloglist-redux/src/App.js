import { connect } from "react-redux"
import "./App.css"
import HomeConnected from "./components/Home"
import MenuConnected from "./components/Menu"
import Message from "./components/Message"

const App = (props) => {
  const notification = props.notification

  return (
    <>
      <HomeConnected></HomeConnected>
      <MenuConnected></MenuConnected>
      {notification.show && <Message notification={notification} />}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const AppConnected = connect(mapStateToProps)(App)

export default AppConnected
