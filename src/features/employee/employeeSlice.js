import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

export const getEmployees = createAsyncThunk(
  "employee/employees",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await employeeService.getEmployees(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getStaffsByGarage = createAsyncThunk(
  "employee/staffs-by-garage",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await employeeService.getStaffsByGarage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addEmployees = createAsyncThunk(
  "employee/addEmp",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await employeeService.addEmployees(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  employees: [],
  review: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAdd: false,
  message: "",
  number: 0,
};
export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload.list;
        state.number = action.payload.count;
        state.isSuccessAdd = false;
        state.message = "success";
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
        state.isSuccessAdd = false;
      })

      .addCase(getStaffsByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaffsByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getStaffsByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
        state.isSuccessAdd = false;
      })
      //Add
      .addCase(addEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEmployees.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.message = "success";
      })
      .addCase(addEmployees.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      
      .addCase(resetState, () => initialState);
  },
});

export default employeeSlice.reducer;
