import initials from '@/filters/initials';

describe('initials', () => {
  it('should return initials if passed firstname and lastname', () => {
    const result = initials('Alex Cook');
    const expectedResult = 'AC';
    expect(result).toEqual(expectedResult);
  });

  it('should return first letter of name if passed firstname', () => {
    const result = initials('Alex');
    const expectedResult = 'A';
    expect(result).toEqual(expectedResult);
  });
});
