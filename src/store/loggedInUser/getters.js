import { ROLE_TYPES, SCOPES } from '@/constants';

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
  isShowDispute(state) {
    return state.profileData.scopes.includes(SCOPES.DISPUTE_READ);
  },
  isUpdateDispute(state) {
    return state.profileData.scopes.includes(SCOPES.DISPUTE_UPDATE);
  },
  isCreateDispute(state) {
    return state.profileData.scopes.includes(SCOPES.DISPUTE_CREATE);
  },
  isPatchDispute(state) {
    return state.profileData.scopes.includes(SCOPES.DISPUTE_PATCH);
  },
  isShowDisputeStatistic(state) {
    return state.profileData.scopes.includes(SCOPES.DISPUTE_STATISTIC);
  },
  isShowDisputeDashboard(state) {
    return state.profileData.scopes.includes(SCOPES.DISPUTE_DASHBOARD);
  },
  isReadRessubmissionTable(state) {
    return state.profileData.scopes.includes(SCOPES.RESSUBMISSION_TABLE_READ);
  },
  isShowOrderWithoutExpectedComission(state) {
    return state.profileData.scopes.includes(SCOPES.ORDER_READ_WITHOUT_EXPECTED_COMISSION);
  },
  isAuthorization(state) {
    return state.profileData.scopes.includes(SCOPES.AUTHORIZATION);
  },
  isShowTeamStatistic(state) {
    return state.profileData.scopes.includes(SCOPES.TEAM_STATISTIC);
  },
  isShowOrderWithExpectedComission(state) {
    return state.profileData.scopes.includes(SCOPES.ORDER_READ_WITH_EXPECTED_COMISSION);
  },
};
