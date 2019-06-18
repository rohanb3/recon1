import badgeLoadData from '@/mixins/badgeLoadData';

describe('badgeLoadData', () => {
  describe('badgeLoadData: computed', () => {
    describe('tableData', () => {
      it('should return tableData', () => {
        const tableName = 'table';
        const mockedThis = {
          tableName,
          $store: {
            state: {
              tables: {
                [tableName]: {
                  id: 1,
                },
              },
            },
          },
        };

        const result = badgeLoadData.computed.tableData.call(mockedThis);

        const expectedData = { id: 1 };

        expect(result).toEqual(expectedData);
      });
    });

    describe('filters', () => {
      it('should return filters', () => {
        const mockedThis = {
          tableData: {
            filters: {
              name: 'filter',
            },
          },
        };

        const result = badgeLoadData.computed.filters.call(mockedThis);

        const expectedData = { name: 'filter' };

        expect(result).toEqual(expectedData);
      });
    });

    describe('applyingFilters', () => {
      it('should return applyingFilters', () => {
        const mockedThis = {
          tableData: {
            applyingFilters: {
              name: 'filter',
            },
          },
        };

        const result = badgeLoadData.computed.applyingFilters.call(mockedThis);

        const expectedData = { name: 'filter' };

        expect(result).toEqual(expectedData);
      });
    });
  });
});
