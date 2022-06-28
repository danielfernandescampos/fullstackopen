const NewBlog = ({
  blogTitle,
  blogAuthor,
  blogUrl,
  blogTitleChange,
  blogAuthorChange,
  blogUrlChange,
  handleAddBlog,
}) => (
  <>
    <h3>new blog:</h3>
    <form onSubmit={handleAddBlog}>
      <label htmlFor="Title">Title: </label>
      <input
        type="text"
        value={blogTitle}
        name="Title"
        onChange={({ target }) => blogTitleChange(target.value)}
      />
      <br></br>
      <label htmlFor="Author">Author: </label>
      <input
        type="text"
        value={blogAuthor}
        name="Author"
        onChange={({ target }) => blogAuthorChange(target.value)}
      />
      <br></br>
      <label htmlFor="Url">Url: </label>
      <input
        type="text"
        value={blogUrl}
        name="Url"
        onChange={({ target }) => blogUrlChange(target.value)}
      />
      <br></br>
      <button type="submit">Create</button>
    </form>
  </>
);

export default NewBlog;
