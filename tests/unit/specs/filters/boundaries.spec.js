import dateRange from '@/filters/boundaries';

describe('boundaries', () => {
  describe('dateRange', () => {
    it('should return formatted range if passed an array of single values', () => {
      const result = dateRange([10]);
      const expectedResult = 'from 10 to 10';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an array with a number and an empty value', () => {
      const result = dateRange([10, null]);
      const expectedResult = 'from 10';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an array of two values', () => {
      const result = dateRange([10, 20]);
      const expectedResult = 'from 10 to 20';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an array with a empty value and an number', () => {
      const result = dateRange([null, 20]);
      const expectedResult = 'to 20';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed an array of two empty value', () => {
      const result = dateRange([null, null]);
      const expectedResult = '';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an object of single values', () => {
      const result = dateRange({ from: 10 });
      const expectedResult = 'from 10';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an object of single values', () => {
      const result = dateRange({ to: 10 });
      const expectedResult = 'to 10';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an object with a number and an empty value', () => {
      const result = dateRange({ from: 10, to: null });
      const expectedResult = 'from 10';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an object with a empty value and an number', () => {
      const result = dateRange({ from: null, to: 10 });
      const expectedResult = 'to 10';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range if passed an object of two values', () => {
      const result = dateRange({ from: 10, to: 20 });
      const expectedResult = 'from 10 to 20';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed incorrect data', () => {
      const result = dateRange('lol');
      const expectedResult = '';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if passed an object of two empty value', () => {
      const result = dateRange({ from: null, to: null });
      const expectedResult = '';
      expect(result).toEqual(expectedResult);
    });

    it('should return formatted range with prefix if passed an object of two values', () => {
      const result = dateRange({ from: 1, to: 10 }, { prefix: 'Number: ' });
      const expectedResult = 'Number: from 1 to 10';
      expect(result).toEqual(expectedResult);
    });
  });
});
