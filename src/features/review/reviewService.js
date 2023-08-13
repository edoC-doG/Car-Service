
import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getReviews = async (page) => {
  const response = await instance.post(
    `${base_url}review/view-all-review`,
    page,
    instance
  );
  // console.log("all review: " , response.data);

  return response.data;
};

const updateReviewStatus = async (data) => {
  const response = await instance.put(
    `${base_url}review/update-status-review`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
}

const getReviewByGarageId = async (data) => {
  const response = await instance.post(
    `${base_url}review/filter-review-by-garage`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
}



const reviewService = {
    getReviews,
    updateReviewStatus ,
    getReviewByGarageId
  };
  
  export default reviewService;