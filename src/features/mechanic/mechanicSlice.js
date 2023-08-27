import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import mechanicService from "./mechanicService";

export const getMechanics = createAsyncThunk(
  "mechanic/mechanics",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
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

export const getMechanicsByBookingId = createAsyncThunk(
  "mechanic/mechanic-by-booking",
  async (id, thunkAPI) => {
    try {
      return await mechanicService.getMechanicsByBookingId(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateMechanicByBookingId = createAsyncThunk(
  "mechanic/update-mechanic-booking",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await mechanicService.updateMechanicByBookingId(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMechanicDetail = createAsyncThunk(
  "mechanic/mechanic-detail",
  async (id, thunkAPI) => {
    try {
      return await mechanicService.getMechanicDetail(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBookingByMechanic = createAsyncThunk(
  "mechanic/booking-by-mechanic",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await mechanicService.getBookingByMechanic(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMechanicsByGarage = createAsyncThunk(
  "mechanic/mechanics-by-garage",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await mechanicService.getMechanicsByGarage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMechanicsAvaliable = createAsyncThunk(
  "mechanic/mechanic-avaliable",
  async (id, thunkAPI) => {
    try {
      return await mechanicService.getMechanicsAvaliable(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AddMechanicsByBooking = createAsyncThunk(
  "mechanic/add-mechanic-avaliable-booking",
  async (data, thunkAPI) => {
    try {
      return await mechanicService.AddMechanicsByBooking(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMechanics = createAsyncThunk(
  "mechanic/add-mechanic",
  async (data, thunkAPI) => {
    try {
      return await mechanicService.addMechanics(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  mechanics: [],
  mechanicsAvaliable: [],
  mechanic: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAction: false,
  isSuccessAdd: false,
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
        state.isSuccessAdd = false;
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
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(updateMechanicStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getMechanicsByBookingId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanicsByBookingId.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics = action.payload;
        state.message = "success";
      })
      .addCase(getMechanicsByBookingId.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateMechanicByBookingId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMechanicByBookingId.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(updateMechanicByBookingId.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getMechanicDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanicDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(getMechanicDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getBookingByMechanic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingByMechanic.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.mechanics = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getBookingByMechanic.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getMechanicsByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanicsByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.mechanics = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getMechanicsByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getMechanicsAvaliable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanicsAvaliable.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanicsAvaliable = action.payload;
        state.message = "success";
      })
      .addCase(getMechanicsAvaliable.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(AddMechanicsByBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddMechanicsByBooking.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(AddMechanicsByBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      .addCase(addMechanics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMechanics.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(addMechanics.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      .addCase(resetState, () => initialState);
  },
});

export default mechanicSlice.reducer;
