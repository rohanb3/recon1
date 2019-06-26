import actions from '@/store/tables/actions';

import { RESET_ALL_FILTERS } from '@/store/tables/actionTypes';
import { RESET_FILTERS } from '@/store/tables/mutationTypes';
import { ENTITY_TYPES } from '@/constants';

describe('tables actions', () => {
  describe('RESET_ALL_FILTERS', () => {
    it('should reset all filters', () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      actions[RESET_ALL_FILTERS](fakeStore);

      Object.values(ENTITY_TYPES).forEach(entityName => {
        expect(fakeStore.commit).toHaveBeenCalledWith(RESET_FILTERS, entityName);
      });
    });
  });
});
