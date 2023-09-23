import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ChevronLeftIcon from "@untitled-ui/icons-react/build/esm/ChevronLeft";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";

import { vi } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { getGarageAdd } from "../../features/garage/garageSlice";
import { Autocomplete } from "@mui/material";
import authService from "../../features/auth/authService";

const viewOptions = [
  {
    label: "Tháng",
    value: "dayGridMonth",
  },
  {
    label: "Tuần",
    value: "timeGridWeek",
  },
  {
    label: "Ngày",
    value: "timeGridDay",
  },
  {
    label: "Agenda",
    value: "listWeek",
  },
];

export const CalendarToolbar = (props) => {
  const {
    date,
    onAddClick,
    onDateNext,
    onDatePrev,
    onDateToday,
    onViewChange,
    view,
    garage,
    ...other
  } = props;
  const dispatch = useDispatch();

  const user = authService.getCurrentUser();
  const role = user?.roleName;
  useEffect(() => {
    dispatch(getGarageAdd());
  }, [dispatch]);

  let recordGarage = useSelector((state) => state.garage.garageAdd);
  recordGarage = [{ id: 0, name: "Tất cả Garage" }, ...recordGarage];

  const [value, setValue] = useState(recordGarage[0]);
  const [inputValue, setInputValue] = useState("");
  const [mdUp, setMdUp] = useState(900);
  // console.log(view);
  const handleViewChange = useCallback(
    (event) => {
      onViewChange?.(event.target.value);
    },
    [onViewChange]
  );
  const dateMonth = format(date, "MMMM", { locale: vi });
  const dateDay = format(date, "y", { locale: vi });

  // On mobile allow only timeGridDay and agenda views
  const availableViewOptions = useMemo(() => {
    return mdUp
      ? viewOptions
      : viewOptions.filter((option) =>
          ["timeGridDay", "listWeek"].includes(option.value)
        );
  }, [mdUp]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  useEffect(() => {
    garage(value?.id);
  }, [value, garage]);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center flex-wrap px-2">
      <div className="flex flex-row items-center gap-2 my-3">
        <h1 className="font-semibold text-lg">{dateMonth},</h1>
        <h1 className=" text-lg"> {dateDay}</h1>
      </div>
      <div className="flex flex-row items-center gap-5">
        <IconButton onClick={onDatePrev}>
          <SvgIcon>
            <ChevronLeftIcon />
          </SvgIcon>
        </IconButton>
        <IconButton onClick={onDateNext}>
          <SvgIcon>
            <ChevronRightIcon />
          </SvgIcon>
        </IconButton>
        <TextField
          label="Lọc dữ liệu"
          name="view"
          onChange={handleViewChange}
          select
          SelectProps={{ native: true }}
          size="small"
          sx={{
            minWidth: 120,
            order: {
              xs: -1,
              md: 0,
            },
          }}
          value={view}
        >
          {availableViewOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        {role === "Admin" ? (
          <Autocomplete
            size="small"
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={recordGarage}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} key={params.key} label="Lọc dữ liệu theo garage" />
            )}
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
CalendarToolbar.propTypes = {
  garage: PropTypes.func,
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  onAddClick: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf([
    "dayGridMonth",
    "timeGridWeek",
    "timeGridDay",
    "listWeek",
  ]).isRequired,
};
