import axios from "axios";

const communicate = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

communicate.interceptors.request.use(
  async (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

export default communicate;