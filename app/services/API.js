import axios from 'axios';
import { getToken } from './_helpers';
import { authTokenDelay, refreshTokenDelay } from '../constants/delays';

const BASE_URL = 'https://staging.devima.solutions';

const client = {
  client_id: 2,
  client_secret: 'A70gUEybx2na3RqMIvpbasaWJCLIKEF6Q1FpIpo3',
};

export const loginWithPassword = data => {
  const loginData = {
    grant_type: 'password',
    username: data.username,
    password: data.password,
    ...client,
  };
  return axios.post(`${BASE_URL}/api/token`, loginData);
};

export const refreshToken = () => {
  const refreshData = {
    grant_type: 'refresh_token',
    refresh_token: getToken('refresh_token', refreshTokenDelay),
    ...client,
  };
  return axios.post(`${BASE_URL}/api/token`, refreshData);
};

export const getUsers = () => {
  const authToken = getToken('access_token', authTokenDelay);
  return axios.get(`${BASE_URL}/api/users`, {
    headers: { Authorization: authToken },
  });
};
