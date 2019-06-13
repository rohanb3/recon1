import accessRights from './accessRights';

export default {
  role(state) {
    return state.profileData.role;
  },
  ...accessRights,
};
