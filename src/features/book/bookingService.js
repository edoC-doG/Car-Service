import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBookings = async (page) => {
    const response = await instance.post(
        `${base_url}booking/view-all-booking`,
        page,
        instance
      );
      console.log("booking response: ",response.data);
    
      return response.data;
}



const getBookingDetail = async (id) => {
    const response = await instance.get(`${base_url}booking/detail-booking/${id}`, instance);
    console.log(`the booking detail of id ${id}: `, response.data);

    return response.data; 
}


const getBookingsOfCustomer = async (pageAndId) => {
    const response = await instance.post(
      `${base_url}booking/filter-booking-by-customer`,
      pageAndId,
      instance
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