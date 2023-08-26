import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCoupons = async (page) => {
  const response = await instance.post(
    `${base_url}coupon/view-all-coupon`,
    page,
    instance
  );
  // console.log(response.data);

  return response.data;
};

const updateCouponStatus = async (data) => {
  const response = await instance.put(
    `${base_url}coupon/update-coupon-status`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
};
const addCoupon = async (data) => {
  const response = await instance.post(
    `${base_url}coupon/create-coupon`,
    data,
    instance
  );
  // console.log(`update status`, response.data);
  return response.data;
};
const couponService = {
  getCoupons,
  updateCouponStatus,
  addCoupon,
};

export default couponService;
