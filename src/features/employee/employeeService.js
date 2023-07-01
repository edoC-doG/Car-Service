import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getEmployees = async (page) => {
  const response = await axios.post(
    `${base_url}user/filter-by-role/245`,
    page,
    config
  );
  console.log("employee: ", response.data);

  return response.data;
};
const employeeService = {
  getEmployees,
};

export default employeeService;
