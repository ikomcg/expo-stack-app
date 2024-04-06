import axios from 'axios';
import qs from 'qs';
import { BASE_SA_URL } from './axiosInstance';

type AxiosInstanceType = object & Omit<RequestApi, 'apiUrl'>;

export const AxiosInstance = (props: AxiosInstanceType) => {
  const { token, signal, params } = props;

  const instance = axios.create({
    baseURL: BASE_SA_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    paramsSerializer: {
      serialize: (params) => qs.stringify(params),
    },
    signal,
    params,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const response = error.response;

      if (response?.status === 401) {
        window.location.href = '/';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
