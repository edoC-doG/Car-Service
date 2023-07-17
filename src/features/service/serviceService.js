
import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getServices = async (page) => {
    const response = await instance.post(
        `${base_url}service/view-all-service`,
        page,
        instance
      );
      console.log("service response: ",response.data);
    
      return response.data;
}

const serviceService = {
    getServices
}

export default serviceService;

