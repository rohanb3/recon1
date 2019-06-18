import getters from '@/store/loggedInUser/getters';
import { SCOPES } from '@/constants';

describe('loggedInUser getters', () => {
  describe('role', () => {
    it('should return role', () => {
      const fakeStore = {
        profileData: {
          role: 'admin',
        },
      };

      const result = getters.role(fakeStore);

      expect(result).toEqual('admin');
    });
  });
  describe('scopes', () => {
    it('should return scopes', () => {
      const fakeStore = {
        profileData: {
          scopes: ['xyzies.authorization.reconciliation.web'],
        },
      };

      const result = getters.scopes(fakeStore);
      const expectedResult = ['xyzies.authorization.reconciliation.web'];

      expect(result).toEqual(expectedResult);
    });
  });
  describe('isShowDispute', () => {
    it('should return isShowDispute', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_READ],
      };

      const result = getters.isShowDispute(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isUpdateDispute', () => {
    it('should return isUpdateDispute', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_UPDATE],
      };

      const result = getters.isUpdateDispute(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isCreateDispute', () => {
    it('should return isCreateDispute', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_CREATE],
      };

      const result = getters.isCreateDispute(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isPatchDispute', () => {
    it('should return isPatchDispute', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_PATCH],
      };

      const result = getters.isPatchDispute(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isPatchSamDispute', () => {
    it('should return isPatchSamDispute', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_PATCH_SAM],
      };

      const result = getters.isPatchSamDispute(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isShowDisputeStatistic', () => {
    it('should return isShowDisputeStatistic', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_STATISTIC],
      };

      const result = getters.isShowDisputeStatistic(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isShowDisputeDashboard', () => {
    it('should return isShowDisputeDashboard', () => {
      const fakeGetters = {
        scopes: [SCOPES.DISPUTE_DASHBOARD],
      };

      const result = getters.isShowDisputeDashboard(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isShowResubmissionTable', () => {
    it('should return isShowResubmissionTable', () => {
      const fakeGetters = {
        scopes: [SCOPES.RESUBMISSION_TABLE_READ],
      };

      const result = getters.isShowResubmissionTable(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isShowOrderWithoutExpectedComission', () => {
    it('should return isShowOrderWithoutExpectedComission', () => {
      const fakeGetters = {
        scopes: [SCOPES.ORDER_READ_WITHOUT_EXPECTED_COMISSION],
      };

      const result = getters.isShowOrderWithoutExpectedComission(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isShowTeamStatistic', () => {
    it('should return isShowTeamStatistic', () => {
      const fakeGetters = {
        scopes: [SCOPES.TEAM_STATISTIC],
      };

      const result = getters.isShowTeamStatistic(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
  describe('isShowOrderWithExpectedComission', () => {
    it('should return isShowOrderWithExpectedComission', () => {
      const fakeGetters = {
        scopes: [SCOPES.ORDER_READ_WITH_EXPECTED_COMISSION],
      };

      const result = getters.isShowOrderWithExpectedComission(null, fakeGetters);

      expect(result).toEqual(true);
    });
  });
});
