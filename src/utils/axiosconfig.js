
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// console.log(getTokenFromLocalStorage.userToken);
export const config = {
    headers: {
            Authorization: `Bearer ${
              getTokenFromLocalStorage !== null ? getTokenFromLocalStorage?.userToken : ""
            }`,
            Accept: "application/json",   
    }
}