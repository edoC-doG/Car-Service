import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  getMechanicsAvaliable,
  resetState,
} from "../../features/mechanic/mechanicSlice";
import authService from "../../features/auth/authService";
import Button from "../filter/Button";
import "../../styles/button.scss";
const AddNewMechanicForBooking = ({ addMechanicBooking }) => {
  const currentUser = authService.getCurrentUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.garageId) {
      dispatch(getMechanicsAvaliable(currentUser.garageId));
    }
  }, [currentUser?.garageId]);

  const mechanicsAvaliable = useSelector(
    (state) => state.mechanic.mechanicsAvaliable
  );

  const mechanicOptions = mechanicsAvaliable.map((item) => ({
    fullName: item.fullName,
    mechanicId: item.mechanicId,
  }));

  // Kiểm tra dữ liệu trước khi sử dụng
  mechanicOptions.forEach((option) => {
    if (typeof option.fullName !== "string") {
      console.error("Invalid fullName:", option.fullName);
    }
  });
  // console.log(newArray);

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = React.useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value?.mechanicId);
    addMechanicBooking(value?.mechanicId, resetForm)
  };

  const resetForm = () => {
    setValue(null);
    
  };
  

  return (
    <div>
      <form  className="flex flex-row justify-center" autoComplete="off">
        <Autocomplete
          size="small"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={mechanicOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Thợ sửa chữa" />}
          getOptionLabel={(option) => option?.fullName}
          isOptionEqualToValue={(option, value) =>
            option.mechanicId === value.mechanicId
          }
        />

        <div className="card flex-row ml-10">
          <Button
            fullWidth
            className="add-button"
            onClick={handleSubmit}
            size="medium"
            text="Submit"
          />
          <Button
            fullWidth
            variant="outlined"
            className="export-button ml-2"
            size="small"
            onClick={resetForm}
            text="Reset"
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewMechanicForBooking;
