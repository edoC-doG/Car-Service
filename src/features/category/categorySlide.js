import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";


export const getCategories = createAsyncThunk( 'category/categories', 

async (data, thunkAPI) => {
    try {
      console.log(data);
      return await categoryService.getCategories(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }

) 

const initialState = {
  
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    number: 0
    
};
 

 export const categorySlice = createSlice ({

    name: "category",
    initialState: initialState, 
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCategories.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.categories = action.payload.list;
          state.number = action.payload.count
          state.message = "success";
        })
        .addCase(getCategories.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload.response.data;
          state.isLoading = false;
        })

    },

 })

 export default categorySlice.reducer;