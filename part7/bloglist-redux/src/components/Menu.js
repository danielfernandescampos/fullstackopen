import { connect } from "react-redux"
import { Link, Route, Routes, useMatch } from "react-router-dom" //eslint-disable-line
import ConnectedBlogs from "../components/Blogs"
import BlogDetails from "./BlogDetails"
import UserDetails from "./UserDetails" //eslint-disable-line
import Users from "./Users"

const Menu = (props) => {
  //eslint-disable-line
  const users = props.users
  const match = useMatch("/user/:id")
  console.log(match)
  let userSelected
  if (users) {
    userSelected = match
      ? users.find((user) => user.id === match.params?.id)
      : null
  }
  const blogs = props.blogs
  const matchBlog = useMatch("/blog/:id")
  console.log(match)
  let blogSelected
  if (blogs) {
    blogSelected = matchBlog
      ? blogs.find((blog) => blog.id === matchBlog.params?.id)
      : null
  }

  const padding = {
    paddingRight: 10,
  }
  const bottomMargin = {
    marginBottom: 20,
  }
  return (
    <>
      <div style={bottomMargin}>
        <span href="#">
          <Link style={padding} to="/">
            blogs
          </Link>
        </span>
        <span href="#">
          <Link style={padding} to="/users">
            users
          </Link>
        </span>
      </div>

      <Routes>
        <Route style={padding} path="/" element={<ConnectedBlogs />} />
        <Route style={padding} path="/users" element={<Users />} />
        <Route
          path="/user/:id"
          element={<UserDetails user={userSelected} />}
        />
        <Route
          path="/blog/:id"
          element={<BlogDetails blog={blogSelected} />}
        />
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
