import getters from '@/store/storage/getters';

describe('storage getters: ', () => {
  describe('getItemById: ', () => {
    it('should return item by id', async () => {
      const entityName = 'company';
      const companyInfo = { id: 7, name: 'Intel' };

      const fakeState = {
        [entityName]: {
          items: [{ id: 3, name: 'Apple' }, { ...companyInfo }, { id: 10, name: 'Samsung' }],
        },
      };

      const func = getters.getItemById(fakeState);
      const result = func(7, entityName, item => item.id);

      expect(result).toEqual(companyInfo);
    });
  });

  describe('storageData: ', () => {
    it('should return storageData by entityName', async () => {
      const entityName = 'company';
      const companyList = {
        items: [{ id: 3, name: 'Apple' }, { id: 7, name: 'Intel' }, { id: 10, name: 'Samsung' }],
      };

      const fakeState = {
        [entityName]: companyList,
        countries: {
          items: [{ id: 10, name: 'Ukraine' }, { id: 5, name: 'USA' }, { id: 5, name: 'Canada' }],
        },
      };

      const func = getters.storageData(fakeState);
      const result = func(entityName);

      expect(result).toEqual(companyList);
    });
  });
});
