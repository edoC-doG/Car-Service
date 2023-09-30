import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBookings = async (page) => {
  const response = await instance.post(
    `${base_url}booking/view-all-booking`,
    page,
    instance
  );
  // console.log("booking response: ", response.data);

  return response.data;
};

const getBookingStatus = async (page) => {
  const response = await instance.post(
    `${base_url}booking/filter-booking-by-status`,
    page,
    instance
  );
  // console.log("booking response: ", response.data);

  return response.data;
};

const getBookingDetail = async (id) => {
  const response = await instance.get(
    `${base_url}booking/detail-booking/${id}`,
    instance
  );
  // console.log(`the booking detail of id ${id}: `, response.data);

  return response.data;
};

const getBookingsOfCustomer = async (pageAndId) => {
  const response = await instance.post(
    `${base_url}booking/filter-booking-by-customer`,
    pageAndId,
    instance
  );

  // console.log(`booking of customer id ${pageAndId.userId}:  `, response.data);
  return response.data;
};

const getWarrantiesOfCustomer = async (pageAndId) => {
  const response = await instance.post(
    `${base_url}booking/filter-warranty-by-customer`,
    pageAndId,
    instance
  );

  // console.log(`booking of customer id ${pageAndId.userId}:  `, response.data);
  return response.data;
};

const getBookingsByGarage = async (pageAndId) => {
  const response = await instance.post(
    `${base_url}booking/filter-booking-by-garage/`,
    pageAndId,
    instance
  );

  return response.data;
};

const getCountBookingStatus = async (id) => {
  const response = await instance.get(
    `${base_url}booking/count-booking-per-status`,
    { params: { garageId: id } },
    instance
  );
  return response.data;
};
const getRevenueOfGagage = async (id) => {
  const response = await instance.get(
    `${base_url}booking/get-revenue-by-garage/${id}`,
    instance
  );
  // console.log(response.data);

  return response.data;
};
const updatePaid = async (id) => {
  const response = await instance.put(
    `${base_url}booking/confirm-booking-are-paid/${id}`,
    instance
  );
  // console.log(response.data);
  return response.data;
}

const updateStt = async (data) => {
  const response = await instance.put(
    `${base_url}booking/update-status-booking/${data.orderSta}&${data.stt}`,
    data,
    instance
  );
  // console.log(response.data);
  return response.data;
}

const updateDetail = async (data) => {
  const response = await instance.put(
    `${base_url}booking/update-booking-detail-status/${data.detailService}&${data.stt}`,
    data,
    instance
  );
  // console.log(response.data);
  return response.data;
}

const updateProductForBookingDetailBookingDetail = async (data) => {
  const response = await instance.put(
    `${base_url}booking/update-booking-detail-for-manager/${data.bookingDetailId}&${data.productId}`,
    data,
    instance
  );
  // console.log(response.data);
  return response.data;
}

const getCalendar = async (id) => {
  const response = await instance.get(
    `${base_url}booking/get-booking-by-garage-calendar`,
    { params: { garageId: id } },
    instance
  );
  // console.log(response.data);
  return response.data;
  }

const AddWarrantyBooking = async (data) => {
  const response = await instance.post(
    `${base_url}booking/create-warranty-by-booking`,
    data,
    instance
  );
  console.log(response.data);
  return response.data;
  } 

const GetTimeBooking = async (data) => {
  const response = await instance.post(
    `${base_url}booking/check-booking`,
    data,
    instance
  );
  // console.log(response.data);
  return response.data 
}  
const bookingService = {
  getBookingDetail,
  getBookings,
  getBookingsOfCustomer,
  getWarrantiesOfCustomer,
  getBookingStatus,
  getBookingsByGarage,
  getCountBookingStatus,
  getRevenueOfGagage,
  updatePaid,
  updateStt,
  updateDetail, 
  updateProductForBookingDetailBookingDetail, 
  getCalendar, 
  AddWarrantyBooking, 
  GetTimeBooking
};

export default bookingService;
