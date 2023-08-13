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

const garageService = {
  getGarages,
  updateGarageStatus,
  getGarageDetail,
};

export default garageService;
