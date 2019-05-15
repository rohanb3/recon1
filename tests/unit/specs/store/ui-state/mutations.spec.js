import mutations from '@/store/ui-state/mutations';
import * as types from '@/store/ui-state/mutationTypes';

describe('ui-state mutations', () => {
  describe('SET_TINY_SIDEBAR_STATUS', () => {
    it('should set tinySidebarStatus', () => {
      const state = {
        tinySidebarStatus: false,
      };

      mutations[types.SET_TINY_SIDEBAR_STATUS](state, true);

      expect(state.tinySidebarStatus).toBeTruthy();
    });
  });
});
