import { numberSign, addSpaceBetweenNumbers, percents } from '@/filters/numberFormat';

describe('numberFormat', () => {
  describe('numberSign', () => {
    it('should return a number with sign # if passed number 123', () => {
      const result = numberSign(123);
      const expectedResult = '#0123';
      expect(result).toEqual(expectedResult);
    });

    it('should return a number with sign # if passed number 12345', () => {
      const result = numberSign(12345);
      const expectedResult = '#12345';
      expect(result).toEqual(expectedResult);
    });

    it('should return a number #0000 if nothing passed', () => {
      const result = numberSign();
      const expectedResult = '#0000';
      expect(result).toEqual(expectedResult);
    });
  });

  describe('addSpaceBetweenNumbers', () => {
    it('should return formated number if passed number', () => {
      const result = addSpaceBetweenNumbers(123456789);
      const expectedResult = '123,456,789';
      expect(result).toEqual(expectedResult);
    });

    it('should return string if passed string', () => {
      const result = addSpaceBetweenNumbers('123456789');
      const expectedResult = '123456789';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if nothing passed', () => {
      const result = addSpaceBetweenNumbers();
      const expectedResult = '';
      expect(result).toEqual(expectedResult);
    });
  });

  describe('percents', () => {
    it('should return number with percent sign if passed number', () => {
      const result = percents(10);
      const expectedResult = '10%';
      expect(result).toEqual(expectedResult);
    });

    it('should return empty string if nothing passed', () => {
      const result = percents();
      const expectedResult = '';
      expect(result).toEqual(expectedResult);
    });
  });
});
