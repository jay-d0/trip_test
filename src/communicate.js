import axios from "axios";

const communicate = axios.create({
  baseURL: "http://127.0.0.1:8000/", // 통신할 서버 도메인 주소 넣으면 됨
});

communicate.interceptors.request.use(
  async (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

export default communicate;
