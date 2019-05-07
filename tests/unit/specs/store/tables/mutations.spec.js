/* eslint-disable import/first */

jest.mock('@/services/tablesColumnsList', () => ({
  getTemplatesTableColumns() {
    return [{ name: 'date' }, { name: 'operator' }, { name: 'type' }];
  },
}));

import mutations from '@/store/tables/mutations';
import * as types from '@/store/tables/mutationTypes';
import { ORDERS } from '@/constants/entityTypes';

describe('tables mutations', () => {
  describe('SET_COLUMNS', () => {
    it('should set columns by tableName', () => {
      const state = {
        [ORDERS]: {
          columns: [],
        },
      };

      const columns = [{ name: 'operator' }, { name: 'date' }];

      mutations[types.SET_COLUMNS](state, {
        tableName: ORDERS,
        columns,
      });

      expect(state[ORDERS].columns).toEqual(columns);
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
        [ORDERS]: {
          columns,
        },
      };

      const expectedColumns = [columns[0], columns[2]];

      mutations[types.HIDE_COLUMN](state, {
        tableName: ORDERS,
        columnName: 'operatorFeedback',
      });

      expect(state[ORDERS].columns).toEqual(expectedColumns);
    });
  });

  describe('SET_DATE_RANGE', () => {
    it('should set date range', () => {
      const dateRange = {
        startDate: '2018-12-19T00:00:00Z',
        endDate: '2018-12-19T00:00:00Z',
      };

      const state = {
        [ORDERS]: {
          dateRange: {
            startDate: null,
            endDate: null,
          },
        },
      };

      mutations[types.SET_DATE_RANGE](state, {
        tableName: ORDERS,
        dateRange,
      });

      expect(state[ORDERS].dateRange).toEqual(dateRange);
    });
  });

  describe('SET_FILTER', () => {
    it('should set filter', () => {
      const state = {
        [ORDERS]: {
          filters: {
            search: '',
          },
          applyingFilters: false,
        },
      };

      mutations[types.SET_FILTER](state, {
        tableName: ORDERS,
        filter: {
          name: 'search',
          value: 'aaaa',
        },
      });

      expect(state[ORDERS].filters.search).toBe('aaaa');
      expect(state[ORDERS].applyingFilters).toBeTruthy();
    });
  });
});
