import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

export const getReviews = createAsyncThunk(
  "review/reviews",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await reviewService.getReviews(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  reviews: [],
  review: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
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
      });
  },
});


export default reviewSlice.reducer;