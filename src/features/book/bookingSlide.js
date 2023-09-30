import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

export const getBookings = createAsyncThunk(
  "booking/bookings",

  async (data, thunkAPI) => {
    try {
      // console.log(data);
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
      // console.log(data);
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

export const getWarrantiesCustomer = createAsyncThunk(
  "customer_/booking-customer",
  async (data, thunkAPI) => {
    try {
      console.log("page and id: ", data);
      return await bookingService.getWarrantiesOfCustomer(data);
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
export const updatePaid  = createAsyncThunk(
  "booking/updatePaid",
  async (id, thunkAPI) => {
    try {
      return await bookingService.updatePaid (id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateStt  = createAsyncThunk(
  "booking/updateSTT",
  async (data, thunkAPI) => {
    try {
      return await bookingService.updateStt (data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateDetail = createAsyncThunk(
  "booking/updateDetail",
  async (data, thunkAPI) => {
    try {
      return await bookingService.updateDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCalendarBooking = createAsyncThunk(
  "booking/booking-calendar",
  async (id, thunkAPI) => {
    try {
      // console.log("id: ", id);
      return await bookingService.getCalendar(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductForBookingDetailBookingDetail = createAsyncThunk(
  "booking/update-product-booking",
  async (data, thunkAPI) => {
    try {
      return await bookingService.updateProductForBookingDetailBookingDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AddWarrantyBookingg = createAsyncThunk(
  "booking/add-warranty-booking",
  async (data, thunkAPI) => {
    try {
      return await bookingService.AddWarrantyBooking(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetTimeBooking = createAsyncThunk(
  "booking/time-booking",
  async (data, thunkAPI) => {
    try {
      return await bookingService.GetTimeBooking(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetStateBooking = createAction("Reset_all_booking");

const initialState = {
  bookings: [],
  booking: {},
  garage: {},
  detail: [],
  customer: {},
  products: [],
  durations: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAdd: false,
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
        state.isSuccessAdd = false;
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
        state.isSuccessAdd = false;
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
      .addCase(getWarrantiesCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarrantiesCustomer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.warranties = action.payload.list;
        state.warrnumber = action.payload.count;
        state.message = "success";
      })
      .addCase(getWarrantiesCustomer.rejected, (state, action) => {
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
      .addCase(updatePaid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaid.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isSuccessAdd = true;
        state.message = "success";
        state.isLoading = false;
      })
      .addCase(updatePaid.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateStt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStt.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isSuccessAdd = true;
        state.message = "success";
        state.isLoading = false;
      })
      .addCase(updateStt.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isSuccessAdd = true;
        state.message = "success";
        state.isLoading = false;
      })
      .addCase(updateDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateProductForBookingDetailBookingDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductForBookingDetailBookingDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isSuccessAdd = true;
        state.message = "success";
        state.isLoading = false;
      })
      .addCase(updateProductForBookingDetailBookingDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getCalendarBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalendarBooking.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.bookings = action.payload;
        state.message = "success";
      })
      .addCase(getCalendarBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(AddWarrantyBookingg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddWarrantyBookingg.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isSuccessAdd = true;
        state.message = "success";
        state.isLoading = false;
      })
      .addCase(AddWarrantyBookingg.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(GetTimeBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTimeBooking.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.durations = action.payload;
        state.message = "success";
      })
      .addCase(GetTimeBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(resetStateBooking, () => initialState);

  },
});

export default bookingSlice.reducer;
