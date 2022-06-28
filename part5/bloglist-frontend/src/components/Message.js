const Message = (props) => {
  const colorStyle = {
    backgroundColor:
      props.message.type === "error" ? "rgb(186, 96, 96)" : "rgb(75, 155, 80)",
  };

  return (
    <div className="message" style={colorStyle}>
      {props.message.message}
    </div>
  );
};

export default Message;
