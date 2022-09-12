import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false);
  const hideWhenVisible = { display: visibility ? "" : "none" };
  const changeVisibility = () => setVisibility(!visibility);
  useImperativeHandle(refs, () => {
    return { changeVisibility };
  });

  return (
    <>
      <div className="toggable" style={hideWhenVisible}>
        {props.children}
      </div>
      <button onClick={changeVisibility}>
        {visibility ? "Cancel" : props.buttonLabel}
      </button>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
