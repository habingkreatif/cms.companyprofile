import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        message: error.response.data?.message || error.message,
      });
    } else if (error.request) {
      console.error("No Response from Server:", error.request);
    } else {
      console.error("Axios Config Error:", error.message);
    }

    return Promise.reject(error);
  }
);
