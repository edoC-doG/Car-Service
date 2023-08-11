import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupons = createAsyncThunk(
  "coupon/coupons",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await couponService.getCoupons(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCouponStatus = createAsyncThunk(
  "coupon/update-status",
  async (data, thunkAPI) => {
    try {
      return await couponService.updateCouponStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  coupons: [],
  coupon: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAction: false,
  message: "",
  number: 0,
};

export const couponSlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateCouponStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCouponStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.customer = action.payload;
        state.message = "success";
      })
      .addCase(updateCouponStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
