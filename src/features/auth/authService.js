import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
   let response = await axios.post(`${base_url}authentication/login`, user);

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

const authService = {
  login,
};

export default authService;
