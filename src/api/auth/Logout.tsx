import axios from 'axios';
import qs from 'qs';

import { BASE_SA_URL } from '../axiosInstance';

import { ProcessApiError } from '~/utils/ApiError';


const LogoutApi = async (token: string) => {
  const data = {
    token: token,
    client_id: process.env.EXPO_CLIENT_ID,
    client_secret: process.env.EXPO_CLIENT_SECRET,
  };

  return axios
    .post(`${BASE_SA_URL}o/revoke_token/`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(() => true)
    .catch((err) => ProcessApiError(err));
};

export default LogoutApi;
