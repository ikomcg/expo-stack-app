import { IsEmptyString } from '~/helper/CheckValue';
import { ERROR_MESSAGE } from '~/utils/Message';
import axios from 'axios';
import qs from 'qs';
import { ProcessApiError } from '~/utils/ApiError';

const smsAxiosInstanceCreator = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 30000,
    paramsSerializer: {
      serialize: (params) => qs.stringify(params),
    },
  });

const GetSchoolDomainApi = async (subdomain: string) => {
  const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL;

  if (!BACKEND_URL) throw new Error(ERROR_MESSAGE.api);

  return await axios
    .get(`${BACKEND_URL}api/schools/${subdomain}`)
    .then((res) => {
      const data = res.data as SchoolDomainType;
      const lastIndex = data.domains.length - 1;
      if (lastIndex < 0) return null;

      return `${data.domains[lastIndex].domain}/`;
    })
    .catch((error) => {
      ProcessApiError(error);
    });
};

export const LoginApi = async (username: string, password: string) => {
  const user = username.split('.');

  if (IsEmptyString(username) || IsEmptyString(password) || user.length === 1)
    throw new Error('Invalid account');

  const domain = await GetSchoolDomainApi(user[0]);

  const logData: LogKeys = {
    username: user[1],
    password,
    grant_type: 'password',
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET ?? '',
  };
  const logDataNew = Object.keys(logData)
    .map((key) => {
      const newKey = key as 'username' | 'password' | 'grant_type' | 'client_id' | 'client_secret';
      return `${key}=${encodeURIComponent(logData[newKey])}`;
    })
    .join('&');

  const smsAxiosInstance = smsAxiosInstanceCreator(`https://${domain}`);

  return await smsAxiosInstance
    .post('o/token/', logDataNew, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      },
    })
    .then((res) => res.data as User)
    .catch((err) => ProcessApiError(err));
};
