import actions from '@/store/tables/actions';

import {
  APPLY_FILTERS,
  RESET_FILTERS,
  RESET_ALL_FILTERS,
  APPLY_DISPUTE_STATUS_FILTER,
} from '@/store/tables/actionTypes';
import { LOAD_ITEMS } from '@/store/storage/actionTypes';
import { TABLE_NAMES, FILTER_NAMES } from '@/constants';
import { SET_FILTERS, APPLYING_FILTERS_DONE } from '@/store/tables/mutationTypes';
import { RESET_ITEMS, SET_ALL_ITEMS_LOADED } from '@/store/storage/mutationTypes';

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
  describe('APPLY_DISPUTE_STATUS_FILTER', () => {
    it('should apply only selected filter if dependent filter is not applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;

      const filterField = FILTER_NAMES.DISPUTE_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [1, 2, 34],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: [],
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
        filterField,
      });

      const expectedDisputeStatusFilters = {
        filters: [{ name: FILTER_NAMES.DISPUTE_STATUS_IDS, value: [1, 2, 34] }].concat(
          selectedFilter
        ),
        tableName: itemType,
      };

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FILTERS, expectedDisputeStatusFilters);
    });

    it('should apply only dependent filter if selected filter is not applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;
      const dependentFilterValues = [4, 8, 9, 2];
      const filterField = FILTER_NAMES.DISPUTE_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: dependentFilterValues,
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
        filterField,
      });

      const expectedDisputeStatusFilters = {
        filters: [{ name: FILTER_NAMES.DISPUTE_STATUS_IDS, value: dependentFilterValues }].concat(
          selectedFilter
        ),
        tableName: itemType,
      };

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FILTERS, expectedDisputeStatusFilters);
    });

    it('should apply two filters as intersection if selected filter and dependent filter is applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;
      const filterField = FILTER_NAMES.DISPUTE_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [3, 8, 7, 9, 6],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: [4, 8, 9, 2],
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
        filterField,
      });

      const expectedDisputeStatusFilters = {
        filters: [{ name: FILTER_NAMES.DISPUTE_STATUS_IDS, value: [8, 9] }].concat(selectedFilter),
        tableName: itemType,
      };

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FILTERS, expectedDisputeStatusFilters);
    });

    it('filter should not be applied if identifiers do not match', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;
      const filterField = FILTER_NAMES.DISPUTE_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [3, 7, 9, 6],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: [4, 2],
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
        filterField,
      });

      const expectedDisputeStatusFilters = {
        filters: [{ name: FILTER_NAMES.DISPUTE_STATUS_IDS, value: [] }].concat(selectedFilter),
        tableName: itemType,
      };

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FILTERS, expectedDisputeStatusFilters);
    });

    it('should call action LOAD_ITEMS if any filter is applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [3, 8, 7, 9, 6],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: [4, 8, 9, 2],
              anyFilter: { from: 2019, to: 2020 },
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
      });

      const expectedDisputeStatusFilters = {
        filters: fakeStore.state[itemType].filters,
        itemType,
      };

      expect(fakeStore.dispatch).toHaveBeenCalledWith(LOAD_ITEMS, expectedDisputeStatusFilters);
    });

    it('should call mutation RESET_ITEMS if filter is not applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [3, 8, 7, 9, 6],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: [4, 10, 2],
              anyFilter: { from: 2019, to: 2020 },
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
      });

      expect(fakeStore.commit).toHaveBeenCalledWith(RESET_ITEMS, itemType);
    });

    it('should call mutation SET_ALL_ITEMS_LOADED if filter is not applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [3, 8, 7, 9, 6],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: [4, 10, 2],
              anyFilter: { from: 2019, to: 2020 },
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
      });

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
    });

    it('should call mutation APPLYING_FILTERS_DONE if filter is not applied', () => {
      const dependentFilterName = FILTER_NAMES.SPECTRUM_STATUS_IDS;

      const selectedFilter = {
        name: FILTER_NAMES.XYZ_STATUS_IDS,
        value: [3, 8, 7, 9, 6],
      };

      const fakeStore = {
        state: {
          [itemType]: {
            filters: {
              [dependentFilterName]: [4, 10, 2],
              anyFilter: { from: 2019, to: 2020 },
            },
          },
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
      };

      actions[APPLY_DISPUTE_STATUS_FILTER](fakeStore, {
        tableName: itemType,
        dependentFilterName,
        selectedFilter,
      });

      expect(fakeStore.commit).toHaveBeenCalledWith(APPLYING_FILTERS_DONE, itemType);
    });
  });
  describe('RESET_FILTERS', () => {
    it('should reset filters', () => {
      const fakeStore = {
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve()),
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

        Object.values(TABLE_NAMES).forEach(entityName => {
          expect(fakeStore.commit).toHaveBeenCalledWith(RESET_FILTERS, entityName);
        });
      });
    });
  });
});
