import { Link, Route, Routes } from "react-router-dom"
import ConnectedBlog from "../components/Blogs"
import Users from "./Users"

const Menu = () => {
  const padding = {
    paddingRight: 10,
  }
  const bottomMargin = {
    marginBottom: 20
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
        <Route style={padding} path="/" element={<ConnectedBlog />} />
        <Route style={padding} path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default Menu
