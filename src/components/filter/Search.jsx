import React from "react";
import { TextField } from "@mui/material";
const Search = ({
  name,
  label,
  value,
  type,

  error = null,
  size,
  onChange,
  ...orther
}) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      size={size}
      {...orther}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Search;
