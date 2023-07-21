
import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const getCategories = async (page) => {
    const response = await instance.post(
      `${base_url}category/view-all-category`,
      page,
      instance
    );
    console.log("category response: ", response.data);
  
    return response.data;
  };
   

const categoryService = {
    getCategories
}

export default categoryService;