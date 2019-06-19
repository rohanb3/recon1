import { authInterceptors } from '@/services/authInterceptors';
import store from '@/store';
import { SET_TOKEN } from '@/store/loggedInUser/mutationTypes';
import { RESPONSE_STATUSES, ROUTE_NAMES } from '@/constants';
import { REFRESH_TOKEN, USER_LOGOUT } from '@/store/loggedInUser/actionTypes';
import axios from 'axios';

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
    it('should return true if passed corect status and header with text invalid_token', async () => {
      const data = {
        response: {
          status: RESPONSE_STATUSES.UNAUTHORIZED,
          headers: {
            'www-authenticate': '123invalid_token123',
          },
        },
        config: {
          headers: {
            Authorization: null,
          },
        },
      };

      authInterceptors.__private__.isUnauthorized = jest.fn(true);
      store.dispatch = jest.fn(() => ({ data: { access_token: '123', refresh_token: '321' } }));
      authInterceptors.__private__.debounceSetToken = jest.fn();
      axios.request = jest.fn(() => 12);

      await authInterceptors.__private__.errorResponseInterceptor(data);

      expect(store.dispatch).toHaveBeenCalledWith(REFRESH_TOKEN);
      expect(axios.request).toHaveBeenCalledWith(12);
      expect(authInterceptors.__private__.debounceSetToken).toHaveBeenCalledWith(REFRESH_TOKEN);
    });
  });
});
