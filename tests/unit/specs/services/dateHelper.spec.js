import { secondsToMinutesSeconds } from '@/services/dateHelper';

describe('dateHelper', () => {
  describe('secondsToMinutesSeconds', () => {
    it('should return "" if no value was passed', () => {
      expect(secondsToMinutesSeconds()).toBe('');
    });

    it('should return "" if 0 was passed', () => {
      expect(secondsToMinutesSeconds(0)).toBe('');
    });

    it('should return "1s" if 1 was passed', () => {
      expect(secondsToMinutesSeconds(1)).toBe('1s');
    });

    it('should return "1m 2s" if 62 was passed', () => {
      expect(secondsToMinutesSeconds(62)).toBe('1m 2s');
    });

    it('should return "0m 0s" if 0 was passed and showZero is true', () => {
      expect(secondsToMinutesSeconds(0, true)).toBe('0m 0s');
    });

    it('should return "0m 1s" if 1 was passed and showZero is true', () => {
      expect(secondsToMinutesSeconds(1, true)).toBe('0m 1s');
    });

    it('should return "1m 0s" if 60 was passed and showZero is true', () => {
      expect(secondsToMinutesSeconds(60, true)).toBe('1m 0s');
    });
  });
});
