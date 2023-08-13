import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

export const getReviews = createAsyncThunk(
  "review/reviews",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await reviewService.getReviews(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateReviewStatus = createAsyncThunk(
  "review/update-status",
  async (data, thunkAPI) => {
    try {
      return await reviewService.updateReviewStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getReviewsByGarage = createAsyncThunk(
  "review/reviews-by-garage",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await reviewService.getReviewByGarageId(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  reviews: [],
  review: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAction: false,
  message: "",
  number: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateReviewStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReviewStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.customer = action.payload;
        state.message = "success";
      })
      .addCase(updateReviewStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getReviewsByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getReviewsByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});


export default reviewSlice.reducer;