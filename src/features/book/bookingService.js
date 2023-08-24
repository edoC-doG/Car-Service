import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBookings = async (page) => {
  const response = await instance.post(
    `${base_url}booking/view-all-booking`,
    page,
    instance
  );
  console.log("booking response: ", response.data);

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
  console.log(`the booking detail of id ${id}: `, response.data);

  return response.data;
};

const getBookingsOfCustomer = async (pageAndId) => {
  const response = await instance.post(
    `${base_url}booking/filter-booking-by-customer`,
    pageAndId,
    instance
  );

  console.log(`booking of customer id ${pageAndId.userId}:  `, response.data);
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
const bookingService = {
  getBookingDetail,
  getBookings,
  getBookingsOfCustomer,
  getBookingStatus,
  getBookingsByGarage,
  getCountBookingStatus,
  getRevenueOfGagage,
};

export default bookingService;
