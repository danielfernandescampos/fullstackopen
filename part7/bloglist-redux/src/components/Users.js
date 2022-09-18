import { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { initializeUsers } from "../reducers/reducer"

const Users = (props) => {
  const users = props.users
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const style = {
    textAlign: "left",
    padding: 2,
    paddingRight: 30,
  }

  return (
    <>
      <h2>users</h2>
      {users && (
        <table>
          <thead>
            <tr>
              <th style={style}>name</th>
              <th style={style}>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <Link to={`/user/${user.id}`}>
                  <td style={style}>{user.name}</td>
                </Link>
                <td style={style}>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const UsersConnected = connect(mapStateToProps)(Users)

export default UsersConnected
