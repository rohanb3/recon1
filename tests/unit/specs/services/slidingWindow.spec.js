import slidingWindow from '@/services/slidingWindow';

describe('slidingWindow', () => {
  it('should return piece of array if passed corect data', () => {
    const dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = slidingWindow(dataArray, 4, 3);

    const expectedArray = [5, 6, 7];
    expect(result).toEqual(expectedArray);
  });
});
