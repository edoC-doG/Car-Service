import React from "react";

import { useStateContext } from "../contexts/ContextProvider";


const ButtonClose = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState } = useStateContext();

  function setCloseButton()  {
    setIsClicked(initialState);
  };
  return (
    <button
      type="button"
      onClick={setCloseButton}
      style={{
        backgroundColor: bgColor,
        color,
        borderRadius,
        padding: "0.75rem",
      }}
      className={` text-${size}  w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default ButtonClose;
