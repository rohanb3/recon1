import { ROLE_TYPES } from '@/constants';

export default {
  isSuperAdmin(state) {
    return [
      ROLE_TYPES.OPERATION_ADMIN,
      ROLE_TYPES.SYSTEM_ADMIN,
      ROLE_TYPES.ACCOUNT_ADMIN,
      ROLE_TYPES.SUPPORT_ADMIN,
    ].includes(state.profileData.role);
  },
  isRetailerAdmin(state) {
    return [ROLE_TYPES.SUPER_ADMIN].includes(state.profileData.role);
  },
  role(state) {
    return state.profileData.role;
  },
};
