import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import authService from "../features/auth/authService.js";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const navigate = useNavigate();
  const { setIsClicked, initialState } = useStateContext();

  const handleLogout = () => {
    const user = authService.logout();
    navigate("/login");
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
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

export default Button;
