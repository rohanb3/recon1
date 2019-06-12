import { SCOPES } from '@/constants';

export default {
  role(state) {
    return state.profileData.role;
  },
  scopes(state) {
    return state.profileData.scopes || [];
  },
  isShowDispute(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_READ);
  },
  isUpdateDispute(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_UPDATE);
  },
  isCreateDispute(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_CREATE);
  },
  isPatchDispute(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_PATCH);
  },
  isShowDisputeStatistic(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_STATISTIC);
  },
  isShowDisputeDashboard(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_DASHBOARD);
  },
  isShowRessubmissionTable(state, getters) {
    return getters.scopes.includes(SCOPES.RESSUBMISSION_TABLE_READ);
  },
  isShowOrderWithoutExpectedComission(state, getters) {
    return getters.scopes.includes(SCOPES.ORDER_READ_WITHOUT_EXPECTED_COMISSION);
  },
  isShowTeamStatistic(state, getters) {
    return getters.scopes.includes(SCOPES.TEAM_STATISTIC);
  },
  isShowOrderWithExpectedComission(state, getters) {
    return getters.scopes.includes(SCOPES.ORDER_READ_WITH_EXPECTED_COMISSION);
  },
};
