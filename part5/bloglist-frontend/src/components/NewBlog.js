import { useState } from "react";

const NewBlog = ({ handleAddBlog }) => {
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
    handleAddBlog(newBlog);
  };

  return (
    <>
      <h3>new blog:</h3>
      <form onSubmit={ addBlog }>
        <label htmlFor="Title">Title: </label>
        <input
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => handleBlogTitleChange(target.value)}
        />
        <br></br>
        <label htmlFor="Author">Author: </label>
        <input
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({ target }) => handleBlogAuthorChange(target.value)}
        />
        <br></br>
        <label htmlFor="Url">Url: </label>
        <input
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({ target }) => handleBlogUrlChange(target.value)}
        />
        <br></br>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewBlog;
