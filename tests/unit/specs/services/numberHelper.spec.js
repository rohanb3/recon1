import { range } from '@/services/numberHelper';

describe('range', () => {
  it('should call range func and return correct array', () => {
    const from = 0;
    const to = 5;
    const array = [0, 1, 2, 3, 4, 5];

    const result = range(from, to);

    expect(result).toEqual(array);
  });
});
