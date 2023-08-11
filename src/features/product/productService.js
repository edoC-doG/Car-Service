import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";



const getProducts = async (page) => {
    const response = await instance.post(
        `${base_url}product/view-all-product`,
        page,
        instance
      );
      console.log("product response: ",response.data);
    
      return response.data;
}

const addProducts = async (data) => {
    const response = await instance.post(
        `${base_url}product/create-product`,
        data,
        instance
      );
      console.log("product response: ",response.data);
      return response.data;
}
const editProducts = async (data) => {
    const response = await instance.put(
        `${base_url}product/update-product`,
        data,
        instance
      );
      console.log("product response: ",response.data);
      return response.data;
}
const productService = {
    getProducts,
    addProducts,
    editProducts
}

export default productService;
