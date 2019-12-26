/* eslint-disable import/first */

jest.mock('@/services/tablesColumnsList', () => ({
  getTemplatesTableColumns() {
    return [{ name: 'date' }, { name: 'operator' }, { name: 'type' }];
  },
}));

import mutations from '@/store/tables/mutations';
import * as types from '@/store/tables/mutationTypes';
import * as filtersHelper from '@/store/tables/filtersHelper';
import { ENTITY_TYPES } from '@/constants';

describe('tables mutations', () => {
  describe('SET_COLUMNS', () => {
    it('should set columns by tableName', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          columns: [],
        },
      };

      const columns = [{ name: 'operator' }, { name: 'date' }];

      mutations[types.SET_COLUMNS](state, {
        tableName: ENTITY_TYPES.ORDERS,
        columns,
      });

      expect(state[ENTITY_TYPES.ORDERS].columns).toEqual(columns);
    });
  });

  describe('HIDE_COLUMN', () => {
    it('should remove column', () => {
      const columns = [
        { name: 'clientFeedback' },
        { name: 'operatorFeedback' },
        { name: 'disposition' },
      ];
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          columns,
        },
      };

      const expectedColumns = [columns[0], columns[2]];

      mutations[types.HIDE_COLUMN](state, {
        tableName: ENTITY_TYPES.ORDERS,
        columnName: 'operatorFeedback',
      });

      expect(state[ENTITY_TYPES.ORDERS].columns).toEqual(expectedColumns);
    });
  });

  describe('SET_DATE_RANGE', () => {
    it('should set date range', () => {
      const dateRange = {
        startDate: '2018-12-19T00:00:00Z',
        endDate: '2018-12-19T00:00:00Z',
      };

      const state = {
        [ENTITY_TYPES.ORDERS]: {
          dateRange: {
            startDate: null,
            endDate: null,
          },
        },
      };

      mutations[types.SET_DATE_RANGE](state, {
        tableName: ENTITY_TYPES.ORDERS,
        dateRange,
      });

      expect(state[ENTITY_TYPES.ORDERS].dateRange).toEqual(dateRange);
    });
  });

  describe('SET_FILTER', () => {
    it('should set filter', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          filters: {
            search: '',
          },
          applyingFilters: false,
        },
      };

      mutations[types.SET_FILTER](state, {
        tableName: ENTITY_TYPES.ORDERS,
        filter: {
          name: 'search',
          value: 'aaaa',
        },
      });

      expect(state[ENTITY_TYPES.ORDERS].filters.search).toBe('aaaa');
      expect(state[ENTITY_TYPES.ORDERS].applyingFilters).toBeTruthy();
    });
  });

  describe('SET_FILTERS', () => {
    it('should set filters if property filters is exists', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          filters: {
            search: '',
          },
          applyingFilters: false,
        },
      };

      mutations[types.SET_FILTERS](state, {
        tableName: ENTITY_TYPES.ORDERS,
        filters: [
          {
            name: 'search',
            value: 'aaaa',
          },
          {
            name: 'age',
            value: 20,
          },
        ],
      });

      const expectedResult = { age: 20, search: 'aaaa' };

      expect(state[ENTITY_TYPES.ORDERS].filters).toEqual(expectedResult);
      expect(state[ENTITY_TYPES.ORDERS].applyingFilters).toBeTruthy();
    });
  });

  describe('RESET_FILTERS', () => {
    it('should set the default filters', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          filters: {
            search: '456',
          },
        },
      };

      filtersHelper.default = jest.fn(() => ({
        search: 123,
      }));

      mutations[types.RESET_FILTERS](state, ENTITY_TYPES.ORDERS);

      const expectedResult = { search: 123 };
      expect(state[ENTITY_TYPES.ORDERS].filters).toEqual(expectedResult);
    });
  });

  describe('APPLYING_FILTERS_DONE', () => {
    it('should set applyingFilters as false', () => {
      const state = {
        [ENTITY_TYPES.ORDERS]: {
          applyingFilters: true,
        },
      };

      mutations[types.APPLYING_FILTERS_DONE](state, ENTITY_TYPES.ORDERS);

      expect(state[ENTITY_TYPES.ORDERS].applyingFilters).toBeFalsy();
    });
  });
});
