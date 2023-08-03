import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import mechanicService from "./mechanicService";

export const getMechanics = createAsyncThunk(
  "mechanic/mechanics",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await mechanicService.getMechanics(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMechanicStatus = createAsyncThunk(
  "mechanic/update-status",
  async (data, thunkAPI) => {
    try {
      return await mechanicService.updateMechanicStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  mechanics: [],
  mechanic: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAction: false,
  message: "",
  number: 0,
};

export const mechanicSlice = createSlice({
  name: "mechanic",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMechanics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanics.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getMechanics.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateMechanicStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMechanicStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.customer = action.payload;
        state.message = "success";
      })
      .addCase(updateMechanicStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      .addCase(resetState, () => initialState);
  },
});

export default  mechanicSlice.reducer;
