import axios from 'axios';
import qs from 'qs';

export const BASE_SA_URL = process.env.EXPO_API_UR;

const axiosInstance = axios.create({
  baseURL: BASE_SA_URL,
  timeout: 2000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params),
  },
});

export default axiosInstance;
