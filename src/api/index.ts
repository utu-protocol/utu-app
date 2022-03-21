import axios from "axios";
import { getUTUApiAccessToken } from "../redux/slices/wallet";

const apiRequest = axios.create();

apiRequest.interceptors.request.use(
  async (config) => {
    const utu_api_token = await getUTUApiAccessToken();
    config.headers = {
      Authorization: `Bearer ${utu_api_token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { apiRequest };
