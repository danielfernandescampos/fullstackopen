import { useState } from "react";

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
        name="Username"
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
      <br></br>
      <label htmlFor="Password">Password: </label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
      <br></br>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
