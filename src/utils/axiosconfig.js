// const getTokenFromLocalStorage = localStorage.getItem("userV2")
//   ? JSON.parse(localStorage.getItem("userV2"))
//   : null;

// console.log(getTokenFromLocalStorage);

import authService from "../features/auth/authService";

const getTokenFromLocalStorage = authService.getCurrentUser();
export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage?.userToken}`,
    Accept: "application/json",
  },
};
