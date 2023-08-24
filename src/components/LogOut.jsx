import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import authService from "../features/auth/authService.js";
import { useDispatch } from "react-redux";
import { resetStateAuth } from "../features/auth/authSlide";
import { resetState } from "../features/customer/customerSilde";

const LogOut = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  
  const dispatch = useDispatch();
  const { setIsClicked, initialState } = useStateContext();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  function handleLogout() {
    user !== null ? authService.logout() : navigate("/login");
    dispatch(resetStateAuth());
    dispatch(resetState());
    navigate("/");

    setIsClicked(initialState);
  }

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

export default LogOut;
