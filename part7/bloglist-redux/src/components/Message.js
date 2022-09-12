const Message = (props) => {
  const colorStyle = {
    backgroundColor:
      props.message.type === "error" ? "#FA7b6c" : "#79D8B0",
  };

  return (
    <div className="message" style={colorStyle}>
      {props.message.message}
    </div>
  );
};

export default Message;
