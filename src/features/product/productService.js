import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";



const getProducts = async (page) => {
    const response = await axios.post(
        `${base_url}product/view-all-product`,
        page,
        config
      );
      console.log("product response: ",response.data);
    
      return response.data;
}

const productService = {
    getProducts
}

export default productService;
