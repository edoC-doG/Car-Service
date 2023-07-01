import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getReviews = async (page) => {
  const response = await axios.post(
    `${base_url}review/view-all-review`,
    page,
    config
  );
  console.log("all review: " , response.data);

  return response.data;
};

const reviewService = {
    getReviews
  };
  
  export default reviewService;