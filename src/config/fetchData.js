import { api } from "./api";

// const api_name = 'api/';

const AccessToken = async () => {
  try {
    const value = localStorage.getItem("ACCESS_TOKEN");
    console.log("ACCESS_TOKEN", value);

    console.log("value", value);

    console.log("access token", value);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error("Error retrieving access token:", e);
    return null;
  }
};

export default {
  Login: async (data) => {
    let url = "users/login";
    return api.postMethod(url, data);
  },
  Register: async (data) => {
    console.log("Enter the new fun", data);
    let url = "auth/user/register";
    return api.postMethod(url, data);
  },
  GetSingleuser: async (id) => {
    let url = `users/${id}`;
    const accessToken = await AccessToken();
    console.log("accessToken", accessToken);

    return api.getMethod(url, accessToken);
  },
};
