import dashForEmptyValue from '@/filters/dashForEmptyValue';

describe('dashForEmptyValue', () => {
  it('should return qwerty if passed qwerty', () => {
    const result = dashForEmptyValue('qwerty');
    const expectedResult = 'qwerty';
    expect(result).toEqual(expectedResult);
  });

  it('should return string with dash if nothing is passed', () => {
    const result = dashForEmptyValue();
    const expectedResult = '-';
    expect(result).toEqual(expectedResult);
  });

  it('should return string with dash if passed a zero', () => {
    const result = dashForEmptyValue(0);
    const expectedResult = '-';
    expect(result).toEqual(expectedResult);
  });
});
