import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getServices = async (page) => {
  const response = await instance.post(
    `${base_url}service/view-all-service`,
    page,
    instance
  );
  console.log("service response: ", response.data);
  return response.data;
};

const addServices = async (data) => {
  const response = await instance.post(
    `${base_url}service/create-service`,
    data,
    instance
  );
  console.log("service response: ", data);
  return response.data;
};
const editServices = async (data) => {
  const response = await instance.put(
      `${base_url}service/update-service`,
      data,
      instance
    );  
    console.log("product response: ",response.data);
    return response.data;
}
const addDetail = async (data) => {
  const response = await instance.post(
    `${base_url}service-detail/create-service-detail`,
    data,
    instance
  );
  console.log("service response: ", response.data);
  return response.data;
};
const getDetailServices = async (data) => {
  const response = await instance.get(
    `${base_url}service/detail-service/${data}`,
    data,
    instance
  );
  console.log("service response: ", response.data);
  return response.data;
};
const serviceService = {
  getServices,
  addServices,
  getDetailServices,
  addDetail,
  editServices
};

export default serviceService;
