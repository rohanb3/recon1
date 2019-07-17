import {
  GET_PROFILE_DATA,
  LOGIN,
  REFRESH_TOKEN,
  UPDATE_PHOTO,
  GET_PHOTO,
  REMOVE_PHOTO,
  GET_RESET_TOKEN,
  USER_LOGOUT,
} from './actionTypes';

import { RESET_ALL_FILTERS } from '@/store/tables/actionTypes';

import {
  SET_PROFILE_DATA,
  SET_TOKEN,
  SET_RESET_TOKEN,
  REMOVE_TOKEN,
  CLEAR_PROFILE_DATA,
  SET_PROMISE_REFRESH_TOKEN,
} from './mutationTypes';

import {
  getProfileData,
  login,
  getAvatar,
  updateAvatar,
  deleteAvatar,
  refreshToken as refreshTokenApi,
  verifyCode,
} from '@/services/identityRepository';

export default {
  async [GET_PROFILE_DATA]({ commit, dispatch }) {
    const profileData = await getProfileData();
    commit(SET_PROFILE_DATA, profileData);
    dispatch(GET_PHOTO);
  },
  async [LOGIN]({ commit }, { email, password }) {
    const emailLowerCase = email.toLowerCase();
    const { data } = await login(emailLowerCase, password);
    const { access_token: accessToken, refresh_token: refreshToken } = data;
    commit(SET_TOKEN, { accessToken, refreshToken });
  },
  async [REFRESH_TOKEN]({ commit, state }) {
    const { refreshToken: currentRefreshToken } = state.token;
    if (!(state.refreshTokenPromise instanceof Promise)) {
      commit(SET_PROMISE_REFRESH_TOKEN, refreshTokenApi(currentRefreshToken));
    }
    return state.refreshTokenPromise;
  },
  async [UPDATE_PHOTO]({ state, dispatch }, formData) {
    await updateAvatar(state.profileData.objectId, formData);
    dispatch(GET_PHOTO);
  },
  async [GET_PHOTO]({ commit, state }) {
    const { data: avatarBase64Url } = await getAvatar(state.profileData.objectId);
    commit(SET_PROFILE_DATA, { ...state.profileData, avatarLink: avatarBase64Url });
  },
  async [REMOVE_PHOTO]({ commit, state }) {
    await deleteAvatar(state.profileData.objectId);
    commit(SET_PROFILE_DATA, { ...state.profileData, avatarLink: null });
  },
  async [GET_RESET_TOKEN]({ commit }, { email, code }) {
    const {
      data: { resetToken },
    } = await verifyCode(email, code);
    commit(SET_RESET_TOKEN, resetToken);
  },
  [USER_LOGOUT]({ commit, dispatch }) {
    commit(REMOVE_TOKEN);
    commit(CLEAR_PROFILE_DATA);
    dispatch(RESET_ALL_FILTERS);
  },
};
