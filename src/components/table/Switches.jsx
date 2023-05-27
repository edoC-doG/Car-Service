import React from "react";
import Switch from "@mui/material/Switch";

const Switches = ({ checked, onchange, color, size, name, other }) => {
  return (
    <Switch
      checked={checked}
      onChange={onchange}
      inputProps={{ "aria-label": "controlled" }}
      name={name}
      size={size}
      color={color}
      {...other}
    />
  );
};

export default Switches;
