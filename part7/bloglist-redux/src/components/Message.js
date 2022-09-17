const Message = (props) => {
  const colorStyle = {
    backgroundColor:
      props.notification.type === "error" ? "#FA7b6c" : "#79D8B0",
  };

  return (
    <div className="message" style={colorStyle}>
      {props.notification.message}
    </div>
  );
};

export default Message;
