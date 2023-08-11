import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getMechanics = async (page) => {
    const response = await instance.post(
      `${base_url}mechanic/view-all-mechanic`,
      page,
      instance
    );
    console.log("mechanic response: ", response.data);
  
    return response.data;
  };


  const updateMechanicStatus = async (data) => {
    const response = await instance.put(
      `${base_url}mechanic/update-mechanic-status`,
      data,
      instance
    );
    // console.log(`update status`, response.data);
    return response.data;
  }
  
const mechanicService = {
    getMechanics, 
    updateMechanicStatus
}

export default mechanicService;