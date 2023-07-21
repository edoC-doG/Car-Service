import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getEmployees = async (page) => {
  const response = await instance.post(
    `${base_url}user/filter-by-role/245`,
    page,
    instance
  );
  console.log("employee: ", response.data);

  return response.data;
};
const employeeService = {
  getEmployees,
};

export default employeeService;
