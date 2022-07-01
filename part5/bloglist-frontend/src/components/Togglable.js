import { useState } from "react";

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false);
  const hideWhenVisible = { display: visibility ? "" : "none" };
  const changeVisibility = () => setVisibility(!visibility)

  return (
    <>
      <div className="toggable" style={hideWhenVisible}>{props.children}</div>
      <button onClick={changeVisibility}>
        {visibility ? "Cancel" : props.buttonLable}
      </button>
    </>
  );
};

export default Togglable;
