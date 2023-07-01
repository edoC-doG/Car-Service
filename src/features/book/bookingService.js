import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBookings = async (page) => {
    const response = await axios.post(
        `${base_url}booking/view-all-booking`,
        page,
        config
      );
      console.log("booking response: ",response.data);
    
      return response.data;
}



const getBookingDetail = async (id) => {
    const response = await axios.get(`${base_url}booking/detail-booking/${id}`, config);
    console.log(`the booking detail of id ${id}: `, response.data);

    return response.data; 
}


const getBookingsOfCustomer = async (pageAndId) => {
    const response = await axios.post(
      `${base_url}booking/filter-booking-by-customer`,
      pageAndId,
      config
    );
  
    console.log(`booking of customer id ${pageAndId.userId}:  `, response.data);
    return response.data;
  };

const bookingService = {
    getBookingDetail,
    getBookings, 
    getBookingsOfCustomer
}

export default bookingService;