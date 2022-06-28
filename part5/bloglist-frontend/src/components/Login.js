const Login = ({
  username,
  usernameChange,
  password,
  passwordChange,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="Username">Username: </label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => usernameChange(target.value)}
      />
      <br></br>
      <label htmlFor="Password">Password: </label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => passwordChange(target.value)}
      />
      <br></br>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
