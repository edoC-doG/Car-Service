import { instance } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
   let response = await instance.post(`${base_url}authentication/login`, user);

   if (response.data) {
    const data =  {
        userEmail: response.data.userEmail,
        userFullName:  response.data.userFullName, 
        userImage: response.data.userImage,
        userToken : response.data.userToken, 
        roleName: response.data.roleDto.roleName, 
        tokenExpires: response.data.tokenExpires
    }
    localStorage.setItem("user",  JSON.stringify(data));
  }
    return response.data;
};

const logout = () => {
  
  localStorage.removeItem("user");
 
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const authService = {
  login,
  logout, 
  getCurrentUser
};

export default authService;
