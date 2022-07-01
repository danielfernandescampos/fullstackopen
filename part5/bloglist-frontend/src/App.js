import "./App.css";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Message from "./components/Message";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const blogRef = useRef();

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

  const handleAddBlog = async (newBlog) => {
    try {
      await blogService.saveBlog(newBlog);
      const newMessage = {
        message: "new blog added",
        type: "success",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
      blogRef.current.changeVisibility();
    } catch (error) {
      const newMessage = {
        message: "something went wrong",
        type: "error",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const handleLogin = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (error) {
      const newMessage = {
        message: "username and password don't match",
        type: "error",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleLike = async (updatedBlog) => {
    console.log(updatedBlog);
    try {
      await blogService.updateBlog(updatedBlog);
      const newMessage = {
        message: "like successfully",
        type: "success",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
      const indexToUpdate = blogs.findIndex(
        (blog) => blog.id === updatedBlog.id
      );
      const update = blogs;
      update[indexToUpdate] = updatedBlog;
      setBlogs(update);
    } catch (err) {
      console.log(err);
      const newMessage = {
        message: "não roloou",
        type: "error",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("do you really want to delete the blog?")) {
      try {
        await blogService.deleteBlog(id);
        const newMessage = {
          message: "deleted successfully",
          type: "success",
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 2000);
      } catch (err) {
        console.log(err);
        const newMessage = {
          message: "não roloou",
          type: "error",
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 2000);
      }
    }
  };

  const handleSort = () => {
    const blogs2 = Array.from(blogs);
    const orderByLikes = blogs2.sort(function (a, b) {
      return b.likes - a.likes;
    });
    setBlogs(orderByLikes);
  };

  return (
    <div>
      <h2>blogs page</h2>
      {user === null ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <div>
          <button onClick={handleLogout}>Log out</button>
          <p>
            <strong>{user.name}</strong> is logged in
          </p>
          <Togglable buttonLabel="New blog" ref={blogRef}>
            <NewBlog handleAddBlog={handleAddBlog} />
          </Togglable>
          <br></br>
          <h3>blogs list</h3>
          <button onClick={handleSort}>sort by likes</button>
          <br></br>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              handleLikeButton={handleLike}
              handleDeleteButton={handleDelete}
            />
          ))}
        </div>
      )}
      {message && <Message message={message} />}
    </div>
  );
};

export default App;
