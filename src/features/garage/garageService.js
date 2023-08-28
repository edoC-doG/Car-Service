import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getGarages = async (page) => {
  const response = await instance.post(
    `${base_url}garage/view-all-garage-for-admin`,
    page,
    instance
  );
  // console.log(response.data);

  return response.data;
};

const getGarageDetail = async (id) => {
  const response = await instance.get(
    `${base_url}/garage/detail-garage/${id}`,
    instance
  );
  // console.log(response.data);

  return response.data;
};

const updateGarageStatus = async (data) => {
  const response = await instance.put(
    `${base_url}garage/update-garage-status`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
};
const addGarageService = async (data) => {
  const response = await instance.post(
    `${base_url}garage-detail/create-garage-detail`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
};
const getSlot = async (id) => {
  const response = await instance.get(
    `${base_url}/garage/view-lots-by-garage/${id}`,
    instance
  );
  return response.data;
};
const getManager = async () => {
  const response = await instance.get(
    `${base_url}user/get-manager-not-assign-by-garage`,
    instance
  );
  return response.data;
};
const addGarage = async (data) => {
  const response = await instance.post(
    `${base_url}garage/create-garage`,
    data,
    instance
  );
  return response.data;
};
const getEmployeesByGarage = async (page) => {
  const response = await instance.post(
    `${base_url}user/filter-by-role/35&${page?.id}`,
    { pageIndex: page?.pageIndex, pageSize: page?.pageSize },
    instance
  );
  // console.log("employee: ", response.data);
  return response.data;
};
const getCouponByGarage = async (id) => {
  const response = await instance.get(
    `${base_url}coupon/get-garage-coupon-for-admin/${id}`,
    instance
  );
  return response.data;
};
const getGarageAdd = async () => {
  const response = await instance.get(
    `${base_url}garage/get-all-id-and-name-garage`,
    instance
  );
  return response.data;
};
const garageService = {
  getGarages,
  updateGarageStatus,
  getGarageDetail,
  addGarageService,
  getSlot,
  getManager,
  addGarage,
  getEmployeesByGarage,
  getCouponByGarage,
  getGarageAdd,
};

export default garageService;
