import "./App.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Message from "./components/Message";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsernameChange = (value) => setUsername(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleBlogTitleChange = (value) => setBlogTitle(value);
  const handleBlogAuthorChange = (value) => setBlogAuthor(value);
  const handleBlogUrlChange = (value) => setBlogUrl(value);
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      loginService.setToken(user.token);
    } catch (error) {
      const newMessage = {
        message: 'username and password don\'t match',
        type: "error",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    }
  };
  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.saveBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      });
      const newMessage = {
        message: `new blog added`,
        type: "success",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      const newMessage = {
        message: 'something went wrong',
        type: "error",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div>
      <h2>blogs page</h2>
      {user === null ? (
        <Login
          usernameChange={handleUsernameChange}
          username={username}
          passwordChange={handlePasswordChange}
          password={password}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <button onClick={handleLogout}>Log out</button>
          <p>
            <strong>{user.name}</strong> is logged in
          </p>
          <NewBlog
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            blogTitleChange={handleBlogTitleChange}
            blogAuthorChange={handleBlogAuthorChange}
            blogUrlChange={handleBlogUrlChange}
            handleAddBlog={handleAddBlog}
          />
          <br></br>
          <h3>blogs list</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {message && <Message message={message} />}
    </div>
  );
};

export default App;
