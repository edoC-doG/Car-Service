import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getEmployees = async (page) => {
  const response = await instance.post(
    `${base_url}user/filter-by-role/24&0`,
    page,
    instance
  );
  // console.log("employee: ", response.data);
  return response.data;
};
const getStaffsByGarage = async (page) => {
  const response = await instance.post(
    `${base_url}user/filter-by-role/5&${page?.id}`,
    { pageIndex: page?.pageIndex, pageSize: page?.pageSize },
    instance
  );
  // console.log("employee: ", response.data);
  return response.data;
};

const addEmployees = async (data) => {
  const response = await instance.post(
    `${base_url}/user/create-user`, data,
    instance
  );
  console.log("employee: ", response.data);
  return response.data;
};

const employeeService = {
  getEmployees,
  addEmployees, 
  getStaffsByGarage
};

export default employeeService;
