import currency from '@/filters/currency';

describe('currency', () => {
  it('should return formatted values with sign $', () => {
    const result = currency(10);
    const expectedResult = '$ 10.00';
    expect(result).toEqual(expectedResult);
  });

  it('should return formatted values with sign $', () => {
    const result = currency(0.75);
    const expectedResult = '$ 0.75';
    expect(result).toEqual(expectedResult);
  });

  it('should return formatted values with sign $', () => {
    const result = currency(10000);
    const expectedResult = '$ 10,000.00';
    expect(result).toEqual(expectedResult);
  });
});
