import { useEffect } from "react"
import { Table } from "react-bootstrap"
import { connect, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { initializeUsers } from "../../reducers/reducer"

const Users = (props) => {
  const users = props.users
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <h2>users</h2>
      {users && (
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
