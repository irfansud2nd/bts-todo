import axios from "axios";
import { apiUrl } from "./constants";
import { getServerSession } from "./session";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.token}`;
    } else {
      throw new Error("Not logged in");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
