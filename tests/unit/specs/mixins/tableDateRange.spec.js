import moment from 'moment';

import tableDateRange from '@/mixins/tableDateRange';
import { FILTER_NAMES, DATE_FORMATS } from '@/constants';

describe('tableDateRange', () => {
  describe('tableData', () => {
    it('should return tableData', () => {
      const tableName = 'table';
      const mockedThis = {
        tableName,
        $store: {
          state: {
            tables: {
              [tableName]: {},
            },
          },
        },
      };

      const result = tableDateRange.computed.tableData.call(mockedThis);
      const expectedResult = {};

      expect(result).toEqual(expectedResult);
    });
  });
  describe('filters', () => {
    it('should return filters', () => {
      const mockedThis = {
        tableData: {
          filters: {},
        },
      };

      const result = tableDateRange.computed.filters.call(mockedThis);

      const expectedResult = {};

      expect(result).toEqual(expectedResult);
    });
  });
  describe('selectedDateRangeFrom', () => {
    it('should return format date', () => {
      const mockedThis = {
        filters: {
          [FILTER_NAMES.CREATED_FROM]: new Date(),
        },
      };

      const result = tableDateRange.computed.selectedDateRangeFrom.call(mockedThis);

      const expectedResult = moment(mockedThis.filters[FILTER_NAMES.CREATED_FROM]).format(
        DATE_FORMATS.MONTH_DAY_FULL_YEAR
      );

      expect(result).toEqual(expectedResult);
    });
  });
  describe('selectedDateRangeTo', () => {
    it('should return format date', () => {
      const mockedThis = {
        filters: {
          [FILTER_NAMES.CREATED_TO]: new Date(),
        },
      };

      const result = tableDateRange.computed.selectedDateRangeFrom.call(mockedThis);

      const expectedResult = moment(mockedThis.filters[FILTER_NAMES.CREATED_TO]).format(
        DATE_FORMATS.MONTH_DAY_FULL_YEAR
      );

      expect(result).toEqual(expectedResult);
    });
  });
  describe('selectedDateRange', () => {
    it('should return selected date range', () => {
      const mockedThis = {
        selectedDateRangeFrom: moment().format(),
        selectedDateRangeTo: moment().format(),
      };

      const result = tableDateRange.computed.selectedDateRange.call(mockedThis);
      const expectedResult = {
        from: moment().format(),
        to: moment().format(),
      };

      expect(result).toEqual(expectedResult);
    });
  });
  describe('isSelectedDateRange', () => {
    it('should return true if date range selected', () => {
      const filteredFieldFrom = moment().format();
      const filteredFieldTo = moment().format();
      const mockedThis = {
        filteredFieldFrom,
        filteredFieldTo,
        filters: {
          [filteredFieldFrom]: moment().format(),
          [filteredFieldTo]: moment().format(),
        },
      };

      const result = tableDateRange.computed.isSelectedDateRange.call(mockedThis);

      expect(!!result).toEqual(true);
    });
  });
});
