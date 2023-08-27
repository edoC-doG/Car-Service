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
    const response = await instance.get(
      `${base_url}mechanic/detail-mechanic/${id}`,
      instance
    );
  
    return response.data;
  };


  const updateMechanicStatus = async (data) => {
    const response = await instance.put(
      `${base_url}user/update-status`,
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


const getBookingByMechanic = async (page) => {
  const response = await instance.post(
    `${base_url}mechanic/get-booking-mechanic-applied`,
    page,
    instance
  );
  // console.log("mechanic response: ", response.data);
  
  return response.data;
};


const getMechanicsByGarage = async (page) => {
  const response = await instance.post(
    `${base_url}mechanic/filter-mechanic-by-garage`,
    page,
    instance
  );
  // console.log("mechanic response: ", response.data);

  return response.data;
};

const getMechanicsAvaliable = async (id) => {
  const response = await instance.get(
    `${base_url}mechanic/get-mechanic-avaliable-by-garage/${id}`, 
    
    instance
  );
  // console.log(`update status`, response.data);
  const sortedData = response.data.sort((a, b) => {
    const nameA = a.fullName;
    const nameB = b.fullName;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedData;
  // return response.data;
}


const AddMechanicsByBooking = async (data) => {
  const response = await instance.post(
    `${base_url}mechanic/add-mechanic-to-booking`,
    data,
    instance
  );
  // console.log("mechanic response: ", response.data);

  return response.data;
};

//ADD
const addMechanics = async (data) => {
  const response = await instance.post(
    `${base_url}/user/create-mechanic`,
    data,
    instance
  );
  // console.log("mechanic response: ", response.data);

  return response.data;
};

const mechanicService = {
    getMechanics, 
    updateMechanicStatus, 
    getMechanicsByBookingId,
    updateMechanicByBookingId, 
    getMechanicDetail, 
    getBookingByMechanic, 
    getMechanicsByGarage, 
    getMechanicsAvaliable,
    AddMechanicsByBooking,
    addMechanics
}

export default mechanicService;