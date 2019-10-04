import { getObjectFromArrayByKey } from '@/services/transformer';

describe('transformer', () => {
  describe('getObjectFromArrayByKey', () => {
    it('should return transform array to object', () => {
      const data = [{ key: 'expectedCommission', value: 100 }];

      const result = getObjectFromArrayByKey(data);

      const expectedData = { expectedCommission: 100 };

      expect(result).toEqual(expectedData);
    });
  });
});
