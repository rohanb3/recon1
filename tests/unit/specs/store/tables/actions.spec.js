import actions from '@/store/tables/actions';

import { APPLY_FILTERS, RESET_FILTERS } from '@/store/tables/actionTypes';
import { LOAD_ITEMS } from '@/store/storage/actionTypes';

import { SET_FILTERS } from '@/store/tables/mutationTypes';

const itemType = 'SOME_TYPE';

describe('tables actions', () => {
  describe('APPLY_FILTERS', () => {
    it('should apply filters', () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      const allFilters = fakeStore.state[itemType].filters;

      actions[APPLY_FILTERS](fakeStore, { tableName: itemType, filters: [] });

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FILTERS, {
        tableName: itemType,
        filters: [],
      });

      expect(fakeStore.dispatch).toHaveBeenCalledWith(LOAD_ITEMS, {
        itemType,
        filters: allFilters,
      });
    });
  });
  describe('RESET_FILTERS', () => {
    it('should reset filters', () => {
      const fakeStore = {
        commit: jest.fn(),
        dispatch: jest.fn(),
      };

      actions[RESET_FILTERS](fakeStore, itemType);

      expect(fakeStore.commit).toHaveBeenCalledWith(RESET_FILTERS, itemType);
      expect(fakeStore.dispatch).toHaveBeenCalledWith(LOAD_ITEMS, { itemType });
    });
  });
});
