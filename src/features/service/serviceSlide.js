import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import serviceService from "./serviceService";

export const getServices = createAsyncThunk(
  "service/services",

  async (data, thunkAPI) => {
    try {
      console.log("check",data);
      return await serviceService.getServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editServices = createAsyncThunk(
  "service/edit",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await serviceService.editServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editDetail = createAsyncThunk(
  "service/edit",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await serviceService.editServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addServices = createAsyncThunk(
  "service/addSer",
  async (data, thunkAPI) => {
    try {
      console.log("check add",data);
      return await serviceService.addServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getDetailServices = createAsyncThunk(
  "service/detailSer",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await serviceService.getDetailServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addDetail = createAsyncThunk(
  "service/addDetail",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await serviceService.addDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getServicesByGarage = createAsyncThunk(
  "service/servicesByGarage",

  async (data, thunkAPI) => {
    try {
      console.log("check",data);
      return await serviceService.getServiceByGarage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  servicesDetail: [],
  services: [],
  serviceInfo: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAdd: false,
  message: "",
  number: 0,
};

export const serviceSlice = createSlice({
  name: "services",
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
        state.isSuccessAdd = false;
        state.isSuccess = true;
        state.services = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      // Action Service
      .addCase(addServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.services.push(action.payload);
        state.message = "";
      })
      .addCase(addServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
       // Action Service Detail
       .addCase(addDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.services.push(action.payload);
        state.message = "";
      })
      .addCase(addDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
       //Edit
       .addCase(editServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(editServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      // Detail Service
      .addCase(getDetailServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.serviceInfo = action.payload;
        state.servicesDetail = action.payload.serviceDetailServiceDtos;
        state.message = "success";
      })
      .addCase(getDetailServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getServicesByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicesByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = false;
        state.isSuccess = true;
        state.services = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getServicesByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })


      .addCase(resetState, () => initialState)
  },
});

export default serviceSlice.reducer;
