import { connect } from "react-redux"
import { Link, Route, Routes, useMatch } from "react-router-dom" //eslint-disable-line
import ConnectedBlogs from "../Blogs/Blogs"
import BlogDetails from "../Blogs/BlogDetails"
import UserDetails from "../Users/UserDetails" //eslint-disable-line
import Users from "../Users/Users"
import { Nav, Navbar } from "react-bootstrap"

const Menu = (props) => {
  const users = props.users
  const match = useMatch("/user/:id")
  let userSelected
  if (users) {
    userSelected = match
      ? users.find((user) => user.id === match.params?.id)
      : null
  }
  const blogs = props.blogs
  const matchBlog = useMatch("/blog/:id")
  let blogSelected
  if (blogs) {
    blogSelected = matchBlog
      ? blogs.find((blog) => blog.id === matchBlog.params?.id)
      : null
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Blogs API</Navbar.Brand>
        <Nav.Link href="#" as="span">
          <Link to="/">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users">users</Link>
        </Nav.Link>
      </Navbar>

      <Routes>
        <Route path="/" element={<ConnectedBlogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserDetails user={userSelected} />} />
        <Route path="/blog/:id" element={<BlogDetails blog={blogSelected} />} />
      </Routes>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs,
  }
}

const MenuConnected = connect(mapStateToProps)(Menu)

export default MenuConnected
