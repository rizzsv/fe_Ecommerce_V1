import axios from "axios";

import { API_URL } from "@/constants/config";
import { getCookie } from "./utils";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const axiosInstanceToken = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getCookie()}`,
  },
});
