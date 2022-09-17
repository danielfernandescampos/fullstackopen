import { connect } from "react-redux";
import { handleLogin } from "../reducers/reducer"
import { useState } from "react";
import Button from "./Button";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (value) => setUsername(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleLoginButton = (event) => {
    event.preventDefault();
    const userCredentials = { username, password };
    props.handleLogin(userCredentials);
  };

  return (
    <form onSubmit={handleLoginButton}>
      <label htmlFor="Username">Username: </label>
      <input
        type="text"
        value={username}
        id="username"
        name="Username"
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
      <br></br>
      <label htmlFor="Password">Password: </label>
      <input
        type="password"
        value={password}
        id="password"
        name="Password"
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
      <br></br>
      <Button id="login-button" type="submit">Login</Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  handleLogin,
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
