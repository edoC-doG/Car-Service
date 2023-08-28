import React from "react";
import { Button as MuiButton } from "@mui/material";
import "../../styles/button.scss";

const Button = ({ disabled , text, size, className, variant, onClick, ...other}) => {
  return (
    <MuiButton
      variant={variant || "contained"}
      className={className}
      size={size}
      disabled= {disabled}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
