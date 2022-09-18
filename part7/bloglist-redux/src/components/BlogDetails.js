import { useState } from "react"
import { useDispatch } from "react-redux"
import { addLike, handleAddComment } from "../reducers/reducer"

const BlogDetails = ({ blog }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  const handleLike = () => {
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const updatedBlog = { ...blog, likes: newLikes }
    dispatch(addLike(updatedBlog))
  }

  const handleInputChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const commentPayload = {
      comment: comment,
      blogId: blog.id,
    }
    dispatch(handleAddComment(commentPayload))
  }

  if (!blog) return null

  return (
    <>
      <h3>{blog.title}</h3>
      <a>{blog.link || "no link"}</a>
      <div>
        likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <form>
        <input onChange={handleInputChange} value={comment} />
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </form>
      <ul>
        {blog.comments?.map((comment) => (
          <li key={Math.random()}>{comment.comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetails
