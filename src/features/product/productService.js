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

const productService = {
    getProducts
}

export default productService;
