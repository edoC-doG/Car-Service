import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
const Select = ({
  name,
  label,
  size,
  title,
  value,
  error = null,
  onChange,
  options,
}) => {
  return (
    <FormControl
      size={size}
      fullWidth
      variant="outlined"
      {...(error && { error: true })}
    >
      {/* <InputLabel>{label}</InputLabel> */}
      <MuiSelect name={name} value={value} onChange={onChange} displayEmpty>
        <MenuItem value="">
          <em>{title}</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
        {/* {options.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))} */}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
