import { useState } from "react";

const Blog = ({ blog, user, handleLikeButton, handleDeleteButton }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleLike = () => {
    const newLikes = blog.likes ? blog.likes + 1 : 1;
    const updatedBlog = {
      author: blog.author,
      id: blog.id,
      likes: newLikes,
      title: blog.title,
      url: blog.url,
    };
    handleLikeButton(updatedBlog);
  };
  const handleDelete = () => {
    handleDeleteButton(blog.id);
  };

  return (
    <>
      <li className="blog">
        {blog.title} <button onClick={handleShowDetails}>view</button>
      </li>
      {showDetails && (
        <div className="blog-details">
          <p>author: {blog.author || "-"}</p>
          <p>url: {blog.url || "-"}</p>
          <p>likes: {blog.likes}</p>
          <button id="like-button" onClick={handleLike}>like</button>
          {user.username === blog.user?.username && (
            <button id="delete-button" onClick={handleDelete} style={{ background: "#FA7b6c" }}>
              delete
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Blog;
