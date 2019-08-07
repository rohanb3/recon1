import { getPercentage } from '@/services/commonHelper';

describe('commonHelper', () => {
  describe('getPercentage', () => {
    it('should return 0 if no data passed', () => {
      const result = getPercentage();
      expect(result).toEqual(0);
    });

    it('should return 50', () => {
      const result = getPercentage(10, 20);
      expect(result).toEqual(50);
    });

    it('should return 333.333', () => {
      const result = getPercentage(10, 3, 3);
      expect(result).toEqual(333.333);
    });

    it('should return 333.333', () => {
      const result = getPercentage({}, {}, 3);
      expect(result).toEqual(0);
    });
  });
});
