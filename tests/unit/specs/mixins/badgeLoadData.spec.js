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

      it('should return empty object if tables not defined', () => {
        const mockedThis = {
          $store: {
            state: { tables: {} },
          },
        };

        const result = badgeLoadData.computed.tableData.call(mockedThis);

        expect(result).toEqual({});
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

      it('should return empty object if filters not defined', () => {
        const mockedThis = {
          tableData: {},
        };

        const result = badgeLoadData.computed.filters.call(mockedThis);

        expect(result).toEqual({});
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

  describe('mounted', () => {
    it('should call loadData with parameter', () => {
      const mockedThis = {
        loadData: jest.fn(),
        filters: 132,
      };

      badgeLoadData.mounted.call(mockedThis);

      expect(mockedThis.loadData).toHaveBeenCalledWith(mockedThis.filters);
    });
  });

  describe('watch', () => {
    describe('applyingFilters', () => {
      it('should call loadData with parameter if newVal is not empty', () => {
        const newVal = 'qazxsw';
        const mockedThis = {
          loadData: jest.fn(),
          filters: 132,
        };

        badgeLoadData.watch.applyingFilters.call(mockedThis, newVal);

        expect(mockedThis.loadData).toHaveBeenCalledWith(mockedThis.filters);
      });

      it('should not call loadData with parameter if newVal is empty', () => {
        const newVal = '';
        const mockedThis = {
          loadData: jest.fn(),
          filters: 132,
        };

        badgeLoadData.watch.applyingFilters.call(mockedThis, newVal);

        expect(mockedThis.loadData).not.toHaveBeenCalledWith(mockedThis.filters);
      });
    });
  });
});
