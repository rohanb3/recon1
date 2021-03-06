import axios from 'axios';
import debounce from 'lodash.debounce';
import store from '@/store';
import { REFRESH_TOKEN, USER_LOGOUT } from '@/store/loggedInUser/actionTypes';
import { RESPONSE_STATUSES, ROUTE_NAMES } from '@/constants';
import { SET_TOKEN, SET_PROMISE_REFRESH_TOKEN } from '@/store/loggedInUser/mutationTypes';

const INVALID_TOKEN = 'invalid_token';
const SET_TOKEN_TIMEOUT = 500;

function requestInterceptor(request) {
  const { token } = store.state.loggedInUser;

  if (!request.disableAuthHeader && token) {
    const headers = {
      ...request.headers,
      Authorization: `Bearer ${token.accessToken}`,
    };

    Object.assign(request, { headers });
  }
  return request;
}

function isUnauthorized(status, header) {
  return status === RESPONSE_STATUSES.UNAUTHORIZED && header.includes(INVALID_TOKEN);
}

const debounceSetToken = debounce(function debounceSetToken(accessToken, refreshToken) {
  store.commit(SET_TOKEN, { accessToken, refreshToken });
  store.commit(SET_PROMISE_REFRESH_TOKEN, null);
}, SET_TOKEN_TIMEOUT);

async function errorResponseInterceptor(data, router) {
  if (isUnauthorized(data.response.status, data.response.headers['www-authenticate'])) {
    try {
      const { data: result } = await store.dispatch(REFRESH_TOKEN);

      const { access_token: accessToken, refresh_token: refreshToken } = result;

      debounceSetToken(accessToken, refreshToken);

      const { headers } = data.config;
      headers.Authorization = `Bearer ${accessToken}`;

      return axios.request({
        ...data.config,
        url: data.config.url.replace(data.config.baseURL, ''),
      });
    } catch {
      await store.dispatch(USER_LOGOUT);
      router.push({ name: ROUTE_NAMES.LOGIN });
    }
  }
  throw data;
}

export default function interceptors(instance, router) {
  instance.interceptors.request.use(request => requestInterceptor(request, router));
  instance.interceptors.response.use(
    response => response,
    error => errorResponseInterceptor(error, router)
  );
}

export const authInterceptors = {
  __private__: { requestInterceptor, isUnauthorized, errorResponseInterceptor },
};
