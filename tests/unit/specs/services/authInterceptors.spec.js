import axios from 'axios';
import interceptors, { authInterceptors } from '@/services/authInterceptors';
import store from '@/store';
import { SET_TOKEN } from '@/store/loggedInUser/mutationTypes';
import { RESPONSE_STATUSES, ROUTE_NAMES } from '@/constants';
import { REFRESH_TOKEN, USER_LOGOUT } from '@/store/loggedInUser/actionTypes';

describe('authInterceptors', () => {
  describe('requestInterceptor', () => {
    it('should return object with accessToken if passed token and disableAuthHeader = false', () => {
      const token = '123456';
      store.commit(SET_TOKEN, { accessToken: token });

      const request = {
        disableAuthHeader: false,
        headers: {
          'User-Agent': 'Mozilla',
        },
      };

      const result = authInterceptors.__private__.requestInterceptor(request);

      const expactedHeaders = {
        ...request,
      };

      expactedHeaders.headers = {
        ...expactedHeaders.headers,
        Authorization: `Bearer ${token}`,
      };

      expect(result).toEqual(expactedHeaders);
    });

    it('should return object without accessToken if passed disableAuthHeader = true', () => {
      const token = '123456';
      store.commit(SET_TOKEN, { accessToken: token });

      const request = {
        disableAuthHeader: true,
        headers: {
          'User-Agent': 'Mozilla',
        },
      };

      const result = authInterceptors.__private__.requestInterceptor(request);

      expect(result).toEqual(request);
    });
  });

  describe('isUnauthorized', () => {
    it('should return true if passed corect status and header with text invalid_token', () => {
      const wwwAuthenticate = '123invalid_token123';
      const status = RESPONSE_STATUSES.UNAUTHORIZED;
      const result = authInterceptors.__private__.isUnauthorized(status, wwwAuthenticate);
      expect(result).toEqual(true);
    });

    it('should return false if passed corect status and header without text invalid_token', () => {
      const wwwAuthenticate = 'invalid';
      const status = RESPONSE_STATUSES.UNAUTHORIZED;
      const result = authInterceptors.__private__.isUnauthorized(status, wwwAuthenticate);
      expect(result).toEqual(false);
    });

    it('should return false if passed incorect status and header with text invalid_token', () => {
      const wwwAuthenticate = 'invalid_token';
      const status = RESPONSE_STATUSES.NOT_FOUND;
      const result = authInterceptors.__private__.isUnauthorized(status, wwwAuthenticate);
      expect(result).toEqual(false);
    });
  });

  describe('errorResponseInterceptor', () => {
    it('should return response if passed corect status and header with text invalid_token', async () => {
      const status = RESPONSE_STATUSES.UNAUTHORIZED;
      const wwwAuthenticate = '123invalid_token123';
      const data = {
        response: {
          status,
          headers: {
            'www-authenticate': wwwAuthenticate,
          },
        },
        config: {
          headers: {
            Authorization: null,
          },
          baseURL: '/api/disputs',
          url: '/api/disputs/disputes/statistic/submitters',
        },
      };

      const accessToken = '123';
      const refreshToken = '321';
      const response = 12345;

      store.dispatch = jest.fn(() => ({
        data: { access_token: accessToken, refresh_token: refreshToken },
      }));
      axios.request = jest.fn(() => response);

      const result = await authInterceptors.__private__.errorResponseInterceptor(data);

      const params = {
        baseURL: '/api/disputs',
        headers: { Authorization: `Bearer ${accessToken}` },
        url: '/disputes/statistic/submitters',
      };

      expect(store.dispatch).toHaveBeenCalledWith(REFRESH_TOKEN);
      expect(axios.request).toHaveBeenCalledWith(params);
      expect(result).toEqual(response);
    });

    it('should throw object with data if the reason is not authorization', async () => {
      const status = RESPONSE_STATUSES.NOT_FOUND;
      const wwwAuthenticate = '123invalid_token123';
      let isThrowed = false;
      let result = null;

      const data = {
        response: {
          status,
          headers: {
            'www-authenticate': wwwAuthenticate,
          },
        },
      };

      try {
        await authInterceptors.__private__.errorResponseInterceptor(data);
      } catch (e) {
        result = e;
        isThrowed = true;
      }

      expect(result).toEqual(data);
      expect(isThrowed).toBeTruthy();
    });

    it('should clear user profile and redirect to login screen if refresh token has expired or something went wrong', async () => {
      const status = RESPONSE_STATUSES.UNAUTHORIZED;
      const wwwAuthenticate = '123invalid_token123';
      let isThrowed = false;
      let result = null;

      const data = {
        response: {
          status,
          headers: {
            'www-authenticate': wwwAuthenticate,
          },
        },
      };

      const router = {
        push: jest.fn(),
      };

      store.dispatch = jest.fn();

      try {
        await authInterceptors.__private__.errorResponseInterceptor(data, router);
      } catch (e) {
        result = e;
        isThrowed = true;
      }

      expect(store.dispatch).toHaveBeenCalledWith(USER_LOGOUT);
      expect(router.push).toHaveBeenCalledWith({ name: ROUTE_NAMES.LOGIN });
      expect(result).toEqual(data);
      expect(isThrowed).toBeTruthy();
    });
  });

  describe('interceptors', () => {
    it('should call request.use and response.use', () => {
      const instance = {
        interceptors: {
          request: {
            use: jest.fn(),
          },
          response: {
            use: jest.fn(),
          },
        },
      };

      interceptors(instance);

      expect(instance.interceptors.request.use).toHaveBeenCalled();
      expect(instance.interceptors.response.use).toHaveBeenCalled();
    });
  });
});
