import { SCOPES } from '@/constants';

export default {
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
  isPatchSamDispute(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_PATCH_SAM);
  },
  isShowDisputeStatistic(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_STATISTIC);
  },
  isShowDisputeDashboard(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_DASHBOARD);
  },
  isShowSubmitters(state, getters) {
    return getters.scopes.includes(SCOPES.DISPUTE_DASHBOARD);
  },
  isShowResubmissionTable(state, getters) {
    return getters.scopes.includes(SCOPES.RESUBMISSION_TABLE_READ);
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
