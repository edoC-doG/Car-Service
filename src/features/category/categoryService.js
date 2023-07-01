import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getCategories = async (page) => {
    const response = await axios.post(
      `${base_url}category/view-all-category`,
      page,
      config
    );
    console.log("category response: ", response.data);
  
    return response.data;
  };
   

const categoryService = {
    getCategories
}

export default categoryService;