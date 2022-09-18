import { connect } from "react-redux"
import { createBlog } from "../../reducers/reducer"
import { useState } from "react";
import { Button } from "react-bootstrap";

const NewBlog = (props) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const handleBlogTitleChange = (value) => setBlogTitle(value);
  const handleBlogAuthorChange = (value) => setBlogAuthor(value);
  const handleBlogUrlChange = (value) => setBlogUrl(value);

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    props.createBlog(newBlog);
  };

  return (
    <>
      <h3>new blog:</h3>
      <form onSubmit={ addBlog }>
        <label htmlFor="Title">Title: </label>
        <input
          type="text"
          id="title"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => handleBlogTitleChange(target.value)}
        />
        <br></br>
        <label htmlFor="Author">Author: </label>
        <input
          type="text"
          id="author"
          value={blogAuthor}
          name="Author"
          onChange={({ target }) => handleBlogAuthorChange(target.value)}
        />
        <br></br>
        <label htmlFor="Url">Url: </label>
        <input
          type="text"
          id="url"
          value={blogUrl}
          name="Url"
          onChange={({ target }) => handleBlogUrlChange(target.value)}
        />
        <br></br>
        <Button variant="secondary" type="submit">Create</Button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state,
  }
}

const mapDispatchToProps = {
  createBlog
}

const ConnectedNewBlog = connect(mapStateToProps, mapDispatchToProps)(NewBlog)

export default ConnectedNewBlog;
