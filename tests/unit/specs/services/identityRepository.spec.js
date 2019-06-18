import identityApi from '@/services/identityApi';
import {
  getProfileData,
  login,
  refreshToken,
  getUser,
  getAvatar,
  updateAvatar,
  deleteAvatar,
  requestVerificationCode,
  verifyCode,
  resetPassword,
} from '@/services/identityRepository';

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
      const scope = 'xyzies.authorization.reconciliation.web';
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

      identityApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getUser(id);

      expect(response).toEqual(data);
      expect(identityApi.get).toHaveBeenCalledWith(`/users/${id}`);
    });
  });

  describe('getAvatar', () => {
    it('should call api.get and return correct data', async () => {
      const id = 1;
      const data = {
        status: 'status',
        data: 'data:image/jpeg;base64,',
      };

      identityApi.get = jest.fn(() => Promise.resolve(data));

      const response = await getAvatar(id);

      expect(response).toEqual(data);
      expect(identityApi.get).toHaveBeenCalledWith(`/users/${id}/avatar`, {
        responseType: 'arraybuffer',
      });
    });
  });
  describe('updateAvatar', () => {
    it('should call api.put', async () => {
      const id = 1;
      const updates = {};

      identityApi.put = jest.fn(() => Promise.resolve());

      await updateAvatar(id, updates);

      expect(identityApi.put).toHaveBeenCalledWith(`/users/${id}/avatar`, updates, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });
  });

  describe('deleteAvatar', () => {
    it('should cal api.delete', async () => {
      const id = 1;

      identityApi.delete = jest.fn(() => Promise.resolve());

      await deleteAvatar(id);

      expect(identityApi.delete).toHaveBeenCalledWith(`/users/${id}/avatar`);
    });
  });

  describe('requestVerificationCode', () => {
    it('should call api.post', async () => {
      const email = 'user@example.com';
      const data = {
        status: 'status',
      };

      identityApi.post = jest.fn(() => Promise.resolve({ data }));

      await requestVerificationCode(email);

      expect(identityApi.post).toHaveBeenCalledWith('/authorize/request-verification-code', {
        email,
      });
    });
  });

  describe('verifyCode', () => {
    it('should call api.post and return correct data', async () => {
      const email = 'user@example.com';
      const code = 1111;

      identityApi.post = jest.fn(() => Promise.resolve());

      await verifyCode(email, code);

      expect(identityApi.post).toHaveBeenCalledWith('/authorize/verify-code', { email, code });
    });
  });

  describe('resetPassword', () => {
    it('should call api.post and return correct data', async () => {
      const resetToken = 'token';
      const password = 'password';

      const data = {
        resetToken,
        password,
      };

      identityApi.post = jest.fn(() => Promise.resolve(data));

      const response = await resetPassword(resetToken, password);

      expect(response).toEqual(data);
      expect(identityApi.post).toHaveBeenCalledWith('/authorize/reset-password', {
        resetToken,
        password,
      });
    });
  });
});
