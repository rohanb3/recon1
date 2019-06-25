import { dateRange } from '@/services/dateHelper';
import { DATE_FORMATS } from '@/constants';

describe('dateHelper', () => {
  describe('dateRange', () => {
    it('should return date range with default format', () => {
      const dateFrom = '2019-06-01';
      const dateTo = '2019-06-07';

      const resultDateRange = dateRange(dateFrom, dateTo);

      const expectedDateRange = [
        '01 June',
        '02 June',
        '03 June',
        '04 June',
        '05 June',
        '06 June',
        '07 June',
      ];
      expect(resultDateRange).toEqual(expectedDateRange);
    });

    it('should return date range with custome format', () => {
      const dateFrom = '2019-06-01';
      const dateTo = '2019-06-07';

      const resultDateRange = dateRange(dateFrom, dateTo, DATE_FORMATS.SHORT_DAY_MONTH_FULL_YEAR);

      const expectedDateRange = [
        '01 June 2019',
        '02 June 2019',
        '03 June 2019',
        '04 June 2019',
        '05 June 2019',
        '06 June 2019',
        '07 June 2019',
      ];
      expect(resultDateRange).toEqual(expectedDateRange);
    });
  });
});
