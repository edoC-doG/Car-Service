import React from "react";
import { Button } from "@mui/material";

const IconButtonn = ({
  className,
  children,
  onClick,
  disabled,
  onMouseOver,

  other,
}) => {
  return (
    <Button
      onClick={onClick}
      className={className}
      disabled={disabled}
      onMouseOver={onMouseOver}
      {...other}
    >
      {children}
    </Button>
  );
};

export default IconButtonn;
