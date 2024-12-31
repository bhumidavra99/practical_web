import axios from "axios";
import { toast } from "react-toastify";

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
apiInstance.interceptors.request.use(
  function (config :any) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
apiInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (!error?.response?.data?.message) {
      toast.error("Something went Wrong!");
    }

  }
);
