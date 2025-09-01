import axios from "axios";

const request = axios.create({
  // baseURL:'/',
  // baseURL:"http://localhost:90/backend",
  baseURL: "/api",

  withCredentials: true,
  timeout: 5000,
});

export default request;