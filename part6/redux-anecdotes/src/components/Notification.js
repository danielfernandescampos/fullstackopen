import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    borderRadius: '10px',
    width: '350px',
    minHeight: '30px',
    padding: '1rem',
    border: '1px solid rgb(93, 93, 93)',
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification