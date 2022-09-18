const UserDetails = ({ user }) => {
  if (!user) return null
  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={Math.random()}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserDetails
