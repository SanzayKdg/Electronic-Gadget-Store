import axios from "axios";

// export const baseURL = "http://127.0.0.1:9000/api/v1";
export const baseURL = "http://192.168.1.70:9000/api/v1";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const api1 = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
