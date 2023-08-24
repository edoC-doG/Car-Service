import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

export const getBookings = createAsyncThunk(
  "booking/bookings",

  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await bookingService.getBookings(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBookingsStatus = createAsyncThunk(
  "booking/bookings-status",

  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await bookingService.getBookingStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getDetailBooking = createAsyncThunk(
  "booking/detail",
  async (id, thunkAPI) => {
    try {
      return await bookingService.getBookingDetail(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBookingsCustomer = createAsyncThunk(
  "customer/booking-customer",
  async (data, thunkAPI) => {
    try {
      console.log("page and id: ", data);
      return await bookingService.getBookingsOfCustomer(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBookingsByGarage = createAsyncThunk(
  "booking/booking-garage",
  async (data, thunkAPI) => {
    try {
      // console.log("page and id: ", data);
      return await bookingService.getBookingsByGarage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCountBookingStatus = createAsyncThunk(
  "booking/booking-count-status",
  async (id, thunkAPI) => {
    try {
      // console.log("id: ", id);
      return await bookingService.getCountBookingStatus(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRevenueOfGagage = createAsyncThunk(
  "booking/revenue-gararge",
  async (id, thunkAPI) => {
    try {
      return await bookingService.getRevenueOfGagage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  bookings: [],
  booking: {},
  garage: {},
  detail: [],
  customer: {},
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  number: 0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getBookingsStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingsStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getBookingsStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getDetailBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailBooking.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
        state.garage = action.payload.garageBookingDto;
        state.customer = action.payload.customerBookingDto;
        state.detail = action.payload.bookingDetailDtos;
        state.message = "success";
      })
      .addCase(getDetailBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getBookingsCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingsCustomer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getBookingsCustomer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      .addCase(getBookingsByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingsByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getBookingsByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getCountBookingStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountBookingStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
        state.message = "success";
      })
      .addCase(getCountBookingStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getRevenueOfGagage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRevenueOfGagage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
        state.message = "success";
      })
      .addCase(getRevenueOfGagage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      

      .addCase(resetState, () => initialState);

  },
});

export default bookingSlice.reducer;
