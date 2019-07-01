import actions from '@/store/tables/actions';

import { APPLY_FILTERS, RESET_FILTERS, RESET_ALL_FILTERS } from '@/store/tables/actionTypes';
import { LOAD_ITEMS } from '@/store/storage/actionTypes';
import { ENTITY_TYPES } from '@/constants';
import { SET_FILTERS, APPLYING_FILTERS_DONE } from '@/store/tables/mutationTypes';

const itemType = 'SOME_TYPE';

describe('tables actions', () => {
  describe('APPLY_FILTERS', () => {
    it('should call mutation SET_FILTERS with parameters', () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_FILTERS](fakeStore, { tableName: itemType, filters: [] });

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FILTERS, {
        tableName: itemType,
        filters: [],
      });
    });

    it('should call action LOAD_ITEMS with parameters if passed true dataLoading', () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_FILTERS](fakeStore, { tableName: itemType, filters: [], dataLoading: true });

      expect(fakeStore.dispatch).toHaveBeenCalledWith(LOAD_ITEMS, {
        itemType,
        filters: [],
      });
    });

    it('should call mutation APPLYING_FILTERS_DONE with parameters if passed true dataLoading', async () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      await actions[APPLY_FILTERS](fakeStore, {
        tableName: itemType,
        filters: [],
        dataLoading: true,
      });

      expect(fakeStore.commit).toHaveBeenCalledWith(APPLYING_FILTERS_DONE, itemType);
    });

    it('should not call action LOAD_ITEMS with parameters if passed false dataLoading', () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_FILTERS](fakeStore, { tableName: itemType, filters: [], dataLoading: false });

      expect(fakeStore.dispatch).not.toHaveBeenCalledWith(LOAD_ITEMS, {
        itemType,
        filters: [],
      });
    });

    it('should call mutation APPLYING_FILTERS_DONE with parameters if passed false dataLoading', () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_FILTERS](fakeStore, { tableName: itemType, filters: [], dataLoading: false });

      expect(fakeStore.commit).toHaveBeenCalledWith(APPLYING_FILTERS_DONE, itemType);
    });

    it('should return true if passed false dataLoading', () => {
      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      const result = actions[APPLY_FILTERS](fakeStore, {
        tableName: itemType,
        filters: [],
        dataLoading: false,
      });

      expect(result).toEqual(true);
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
});
