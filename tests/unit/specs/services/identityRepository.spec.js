import identityApi from '@/services/identityApi';
import { getProfileData, login, refreshToken, getUser } from '@/services/identityRepository';

describe('identityRepository', () => {
  describe('getProfileData', () => {
    it('should call api.get and return correct data', async () => {
      const data = {
        email: 'user@example.com',
        role: 'admin',
      };

      identityApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getProfileData();

      expect(response).toEqual(data);
      expect(identityApi.get).toHaveBeenCalledWith('/users/profile');
    });
  });

  describe('login', () => {
    it('should call api.post and return correct data', async () => {
      const username = 'user@example.com';
      const password = 'password';
      const scope = 'xyzies.authorization.reviews.admin';
      const data = {
        username,
        password,
        scope,
      };

      identityApi.post = jest.fn(() => Promise.resolve({ data }));

      await login(username, password);

      expect(identityApi.post).toHaveBeenCalledWith('/authorize/token', { ...data });
    });
  });

  describe('refreshToken', () => {
    it('should call api.post and return correct data', async () => {
      // eslint-disable-next-line
      const refresh_token = 'token';

      identityApi.post = jest.fn(() => Promise.resolve({ refresh_token }));

      const response = await refreshToken(refresh_token);

      expect(response).toEqual({ refresh_token });
      expect(identityApi.post).toHaveBeenCalledWith('/authorize/refresh', { refresh_token });
    });
  });

  describe('getUser', () => {
    it('should call api.get and return correct data', async () => {
      const id = 1;
      const data = {
        id,
        email: 'user@example.com',
      };

      identityApi.get = jest.fn(() => Promise.resolve(data));

      const response = await getUser(id);

      expect(response).toEqual(data);
      expect(identityApi.get).toHaveBeenCalledWith(`/users/${id}`);
    });
  });
});
