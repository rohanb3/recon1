import getters from '@/store/tables/getters';

describe('tables getters: ', () => {
  describe('tableData: ', () => {
    it('should return tableData by tableName', async () => {
      const tableName = 'company';
      const companyTable = {
        items: [{ id: 3, name: 'Apple' }, { id: 7, name: 'Intel' }, { id: 10, name: 'Samsung' }],
      };

      const fakeState = {
        [tableName]: companyTable,
        countries: {
          items: [{ id: 10, name: 'Ukraine' }, { id: 5, name: 'USA' }, { id: 5, name: 'Canada' }],
        },
      };

      const func = getters.tableData(fakeState);
      const result = func(tableName);

      expect(result).toEqual(companyTable);
    });
  });
});
