import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getEmployees = async (page) => {
  const response = await instance.post(
    `${base_url}user/filter-by-role/24`,
    page,
    instance
  );
  // console.log("employee: ", response.data);

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
  addEmployees
};

export default employeeService;
