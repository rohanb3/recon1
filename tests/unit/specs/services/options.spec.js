import options from '@/services/options';

describe('daysShort', () => {
  it('should return short days of week', () => {
    const expectedResult = ['m', 'T', 'w', 't', 'f', 'S', 's'];
    expect(options.daysShort).toEqual(expectedResult);
  });
});
