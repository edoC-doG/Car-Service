import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getServices = async (page) => {
    const response = await axios.post(
        `${base_url}service/view-all-service`,
        page,
        config
      );
      console.log("service response: ",response.data);
    
      return response.data;
}

const serviceService = {
    getServices
}

export default serviceService;

