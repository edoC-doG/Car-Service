import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceService from "./serviceService";


export const getServices = createAsyncThunk( 'service/services', 

async (data, thunkAPI) => {
    try {
      console.log(data);
      return await serviceService.getServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }

) 
const initialState = {
  
    services: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    number: 0
    
};

export const serviceSlice = createSlice ({

    name: "product",
    initialState: initialState, 
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getServices.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getServices.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.services = action.payload.list;
          state.number = action.payload.count
          state.message = "success";
        })
        .addCase(getServices.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload.response.data;
          state.isLoading = false;
        })

    },

 })

 export default serviceSlice.reducer;