import { instance} from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

console.log(instance);

const getCustomers = async (page) => {
  const response = await instance.post(
    `${base_url}user/filter-by-role/1`,
    page,
    instance
  );
  console.log(response.data);

  return response.data;
};

const getNumberCustomers = async () => {
  const response = await instance.get(`${base_url}authentication/count/Customer`);
  console.log("the number of customer: ", response.data);

  return response.data;
};

const getDetailCustomer = async (id) => {
  const response = await instance.get(
    `${base_url}user/detail-customer/${id}`,
    instance
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
