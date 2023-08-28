import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import garageService from "./garageService";

export const getGarages = createAsyncThunk(
  "garage/garages",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await garageService.getGarages(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateGarageStatus = createAsyncThunk(
  "garage/update-status",
  async (data, thunkAPI) => {
    try {
      return await garageService.updateGarageStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGarageDetail = createAsyncThunk(
  "garage/detail-gararge",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await garageService.getGarageDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSlot = createAsyncThunk(
  "garage/slot-garage",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await garageService.getSlot(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEmployeesByGarage = createAsyncThunk(
  "employee/employees-by-garage",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await garageService.getEmployeesByGarage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  garages: [],
  garage: {},
  manager: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAction: false,
  message: "",
  number: 0,
  carCount : 0
};

export const garageSlice = createSlice({
  name: "garage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGarages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGarages.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.garages = action.payload;
        state.message = "success";
      })
      .addCase(getGarages.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateGarageStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGarageStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.message = "success";
      })
      .addCase(updateGarageStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getGarageDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGarageDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.garage = action.payload;
        state.manager = action.payload.managerGarageDto
        state.message = "success";
      }) 
      .addCase(getGarageDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getSlot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSlot.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.garages = action.payload.lotLists;
        state.number = action.payload.freeCount
        state.carCount = action.payload.beingUsedCount
        state.message = "success";
      }) 
      .addCase(getSlot.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getEmployeesByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeesByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.garages = action.payload;
      //   state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getEmployeesByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
        state.isSuccessAdd = false;
      })

      .addCase(resetState, () => initialState);
  },
});

export default garageSlice.reducer;
