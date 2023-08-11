import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlide.js';
import customerReducer from '../features/customer/customerSilde'
import reviewReducer from '../features/review/reviewSlice'
import categoryReducer from '../features/category/categorySlide.js'
import productReducer from '../features/product/productSlice.js'
import serviceReducer from '../features/service/serviceSlide.js'
import bookingReducer from '../features/book/bookingSlide.js'
import employeeReducer from '../features/employee/employeeSlice.js'
import garageReducer from '../features/garage/garageSlice.js'
import mechanicReducer from '../features/mechanic/mechanicSlice.js'
import couponReducer from '../features/coupon/couponSlice.js'


export const store = configureStore({
    reducer: {
        auth: authReducer, 
        customer: customerReducer,
        review: reviewReducer, 
        garage: garageReducer,
        category: categoryReducer, 
        product: productReducer,
        service: serviceReducer, 
        booking: bookingReducer, 
        employee: employeeReducer, 
        mechanic: mechanicReducer,
        coupon: couponReducer, 
    }, 

    // check error: A non-serializable value was detected in an action
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
})