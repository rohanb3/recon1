import moment from 'moment';
import {
  dateMonthYear,
  dateYearMonthDay,
  dateDefaultFormat,
  dateShortDayMonthYear,
} from '@/filters/dateFormat';

describe('dateMonthYear', () => {
  beforeAll(() => {
    moment.locale('en');
  });

  describe('dateMonthYear', () => {
    it('should return date format as MMM YYYY if passed date', () => {
      const result = dateMonthYear('2019-01-28T16:48:19.907');
      const expectedResult = 'January 2019';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed empty string', () => {
      const result = dateMonthYear('');
      expect(result).toEqual('');
    });
  });

  describe('dateYearMonthDay', () => {
    it('should return date format as YYYY-MM-DD if passed date', () => {
      const result = dateYearMonthDay('2019-05-28T16:48:19.907');
      const expectedResult = '2019-05-28';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed empty string', () => {
      const result = dateYearMonthDay('');
      expect(result).toEqual('');
    });
  });

  describe('dateDefaultFormat', () => {
    it('should return date format as DD MMM YYYY if passed date', () => {
      const result = dateDefaultFormat('2019-01-28T16:48:19.907');
      const expectedResult = '28 Jan 2019, 06:48';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed empty string', () => {
      const result = dateDefaultFormat('');
      expect(result).toEqual('');
    });
  });

  describe('dateShortDayMonthYear', () => {
    it('should return date format as DD MMMM YYYY if passed date', () => {
      const result = dateShortDayMonthYear('2019-01-28T16:48:19.907');
      const expectedResult = '28 January 2019';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed empty string', () => {
      const result = dateShortDayMonthYear('');
      expect(result).toEqual('');
    });
  });
});
