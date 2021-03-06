import actions from '@/store/loggedInUser/actions';
import {
  GET_PROFILE_DATA,
  LOGIN,
  REFRESH_TOKEN,
  GET_PHOTO,
  REMOVE_PHOTO,
  UPDATE_PHOTO,
  GET_RESET_TOKEN,
  USER_LOGOUT,
} from '@/store/loggedInUser/actionTypes';

import {
  SET_PROFILE_DATA,
  SET_TOKEN,
  SET_PROMISE_REFRESH_TOKEN,
  SET_RESET_TOKEN,
  REMOVE_TOKEN,
  CLEAR_PROFILE_DATA,
} from '@/store/loggedInUser/mutationTypes';

import { RESET_ALL_FILTERS } from '@/store/tables/actionTypes';

import * as identityRepository from '@/services/identityRepository';

describe('loggedInUser actions: ', () => {
  describe('GET_PROFILE_DATA: ', () => {
    it('should load profile', async () => {
      const fakeStore = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        state: {},
      };

      const result = {
        email: 'salesrep@test.com',
        givenName: 'Dima',
        surname: 'Mortyk',
        companyId: 7929,
        avatarLink: null,
      };

      identityRepository.getProfileData = jest.fn(() => Promise.resolve(result));

      await actions[GET_PROFILE_DATA](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_PROFILE_DATA, result);
      expect(identityRepository.getProfileData).toHaveBeenCalled();
    });

    it('should call action GET_PHOTO', async () => {
      const fakeStore = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        state: {},
      };

      identityRepository.getProfileData = jest.fn(() => Promise.resolve());

      await actions[GET_PROFILE_DATA](fakeStore);

      expect(fakeStore.dispatch).toHaveBeenCalledWith(GET_PHOTO);
    });
  });
  describe('LOGIN: ', () => {
    it('should get token according to email and login', async () => {
      const fakeStore = {
        commit: jest.fn(),
        state: {},
      };
      const userData = {
        email: 'test@test.com',
        password: '123',
      };

      const response = {
        data: {
          access_token: '123',
          refresh_token: '456',
        },
      };
      const { access_token: accessToken, refresh_token: refreshToken } = response.data;
      identityRepository.login = jest.fn(() => Promise.resolve(response));

      await actions[LOGIN](fakeStore, userData);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TOKEN, { accessToken, refreshToken });
      expect(identityRepository.login).toHaveBeenCalled();
    });
  });
  describe('REFRESH_TOKEN: ', () => {
    it('should get new Promise', async () => {
      const refreshToken = '123';

      const fakeStore = {
        commit: jest.fn(),
        state: {
          token: {
            refreshToken,
          },
          refreshTokenPromise: null,
        },
      };

      identityRepository.refreshToken = jest.fn(() => Promise.resolve());

      await actions[REFRESH_TOKEN](fakeStore);

      expect(identityRepository.refreshToken).toHaveBeenCalledWith(refreshToken);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_PROMISE_REFRESH_TOKEN, expect.any(Object));
    });
  });

  describe('UPDATE_PHOTO: ', () => {
    it('should update url photo', async () => {
      const objectId = '23gh234jhhwej';
      const formData = { file: 'photo' };

      const fakeStore = {
        state: {
          profileData: {
            objectId,
          },
        },
        dispatch: jest.fn(),
      };

      identityRepository.updateAvatar = jest.fn();

      await actions[UPDATE_PHOTO](fakeStore, formData);

      expect(identityRepository.updateAvatar).toHaveBeenCalledWith(objectId, formData);
      expect(fakeStore.dispatch).toHaveBeenCalledWith(GET_PHOTO);
    });
  });

  describe('GET_PHOTO: ', () => {
    it('should get url photo', async () => {
      const objectId = '23gh234jhhwej';
      const avatarBase64Url = 'data:image/jpeg;base64,iVBORw0KGg...';

      const fakeStore = {
        commit: jest.fn(),
        state: {
          profileData: {
            objectId,
            avatarLink: null,
          },
        },
      };

      identityRepository.getAvatar = jest.fn(() => Promise.resolve({ data: avatarBase64Url }));

      await actions[GET_PHOTO](fakeStore);

      expect(identityRepository.getAvatar).toHaveBeenCalledWith(objectId);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_PROFILE_DATA, {
        avatarLink: avatarBase64Url,
        objectId,
      });
    });
  });

  describe('REMOVE_PHOTO: ', () => {
    it('should remove url photo', async () => {
      const objectId = '23gh234jhhwej';

      const fakeStore = {
        commit: jest.fn(),
        state: {
          profileData: {
            objectId,
            avatarLink: null,
          },
        },
      };

      identityRepository.deleteAvatar = jest.fn(() => Promise.resolve());

      await actions[REMOVE_PHOTO](fakeStore);

      expect(identityRepository.getAvatar).toHaveBeenCalledWith(objectId);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_PROFILE_DATA, {
        avatarLink: null,
        objectId,
      });
    });
  });

  describe('GET_RESET_TOKEN: ', () => {
    it('should get remove token', async () => {
      const resetToken = 'fdg234ger56fer';
      const code = 5793;
      const email = 'example@example.com';

      const fakeStore = {
        commit: jest.fn(),
      };

      identityRepository.verifyCode = jest.fn(() => Promise.resolve({ data: { resetToken } }));

      await actions[GET_RESET_TOKEN](fakeStore, { email, code });

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_RESET_TOKEN, resetToken);
    });
  });

  describe('USER_LOGOUT: ', () => {
    it('should user logout', async () => {
      const fakeStore = {
        commit: jest.fn(),
        dispatch: jest.fn(),
      };

      await actions[USER_LOGOUT](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(REMOVE_TOKEN);
      expect(fakeStore.commit).toHaveBeenCalledWith(CLEAR_PROFILE_DATA);
      expect(fakeStore.dispatch).toHaveBeenCalledWith(RESET_ALL_FILTERS);
    });
  });
});
