import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (value) => setUsername(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleLoginButton = (event) => {
    event.preventDefault();
    const userCredentials = { username, password };
    handleLogin(userCredentials);
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
      <button id="login-button" type="submit">Login</button>
    </form>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
