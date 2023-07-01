import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCustomers = async (page) => {
  const response = await axios.post(
    `${base_url}user/filter-by-role/1`,
    page,
    config
  );
  console.log(response.data);

  return response.data;
};

const getNumberCustomers = async () => {
  const response = await axios.get(`${base_url}authentication/count/Customer`);
  console.log("the number of customer: ", response.data);

  return response.data;
};

const getDetailCustomer = async (id) => {
  const response = await axios.get(
    `${base_url}user/detail-customer/${id}`,
    config
  );

  console.log(`detail customer ${id}:`, response.data);

  return response.data;
};





const customerService = {
  getCustomers,
  getNumberCustomers,
  getDetailCustomer, 

};

export default customerService;
