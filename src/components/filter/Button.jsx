import React from "react";
import { Button as MuiButton } from "@mui/material";
import "../../styles/button.scss";

const Button = ({ text, size, className, variant, onClick, ...other }) => {
  return (
    <MuiButton
      variant={variant || "contained"}
      className={className}
      size={size}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
