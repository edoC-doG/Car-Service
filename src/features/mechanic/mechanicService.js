import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getMechanics = async (page) => {
    const response = await instance.post(
      `${base_url}mechanic/view-all-mechanic`,
      page,
      instance
    );
    // console.log("mechanic response: ", response.data);
  
    return response.data;
  };

  const getMechanicDetail = async (id) => {
    const response = await instance.post(
      `${base_url}mechanic/detail-mechanic/${id}`,
      instance
    );
    // console.log("mechanic response: ", response.data);
  
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
  
const getMechanicsByBookingId = async (id) => {
  const response = await instance.get(
    `${base_url}mechanic/ffilter-mechanic-by-booking/${id}`,
    
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
}

const updateMechanicByBookingId = async (data) => {
  const response = await instance.put(
    `${base_url}mechanic/remove-mechanic-from-booking`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
}

const mechanicService = {
    getMechanics, 
    updateMechanicStatus, 
    getMechanicsByBookingId,
    updateMechanicByBookingId, 
    getMechanicDetail
}

export default mechanicService;