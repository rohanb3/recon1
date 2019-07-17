import { ENTITY_TYPES } from '@/constants';
import { getEntityActions } from '@/store/storage/repositoryHelper';

describe('repositoryHelper', () => {
  describe('getEntityActions: ', () => {
    it('should return object with entity actions', () => {
      const result = getEntityActions(ENTITY_TYPES.ORDERS);

      const expectedResult = {
        create: expect.any(Function),
        delete: expect.any(Function),
        getAll: expect.any(Function),
        update: expect.any(Function),
      };
      expect(result).toEqual(expectedResult);
    });

    it('shold throw an exception if handler not defined', () => {
      let isThrowed = false;

      const result = getEntityActions(ENTITY_TYPES.ORDERS);

      try {
        result.update();
      } catch {
        isThrowed = true;
      }

      expect(isThrowed).toBeTruthy();
    });
  });
});
