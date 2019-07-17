import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

jest.useFakeTimers();

describe('tableFilterAutocomplete mixin', () => {
  describe('tableFilterAutocomplete computed', () => {
    describe('selectedItems', () => {
      it('should return selectedItems', () => {
        const filterName = 'filter';
        const mockedThis = {
          filterName,
          loading: false,
          [filterName]: [
            { id: 1, name: 'Alabama', value: 'AL', selected: true },
            { id: 2, name: 'Alaska', value: 'AK' },
            { id: 3, name: 'Arizona', value: 'AZ', selected: true },
            { id: 4, name: 'Arkansas', value: 'AR' },
          ],
        };

        const selectedItems = tableFilterAutocomplete.computed.selectedItems.call(mockedThis);

        const expectedSelectedItems = [
          { id: 1, name: 'Alabama', value: 'AL', selected: true },
          { id: 3, name: 'Arizona', value: 'AZ', selected: true },
        ];

        expect(expectedSelectedItems).toEqual(selectedItems);
      });
    });

    describe('tableData', () => {
      it('should return tableData', () => {
        const tableName = 'tableName';
        const mockedThis = {
          tableName,
          $store: {
            state: {
              tables: {
                [tableName]: {
                  name: tableName,
                  items: [
                    { id: 1, name: 'Alabama', value: 'AL', selected: true },
                    { id: 3, name: 'Arizona', value: 'AZ', selected: true },
                  ],
                },
              },
            },
          },
        };

        const tableData = tableFilterAutocomplete.computed.tableData.call(mockedThis);

        const expectedTableData = {
          name: tableName,
          items: [
            { id: 1, name: 'Alabama', value: 'AL', selected: true },
            { id: 3, name: 'Arizona', value: 'AZ', selected: true },
          ],
        };

        expect(expectedTableData).toEqual(tableData);
      });

      it('should return empty object if not defined table', () => {
        const tableName = 'tableName';
        const mockedThis = {
          tableName,
          $store: {
            state: {
              tables: {},
            },
          },
        };

        const tableData = tableFilterAutocomplete.computed.tableData.call(mockedThis);

        expect(tableData).toEqual({});
      });
    });

    describe('filters', () => {
      it('should return filters', () => {
        const tableName = 'tableName';
        const mockedThis = {
          tableData: {
            filters: {
              tableName,
            },
          },
        };

        const filters = tableFilterAutocomplete.computed.filters.call(mockedThis);

        const expectedFilters = {
          tableName: 'tableName',
        };

        expect(expectedFilters).toEqual(filters);
      });

      it('should return empty object if not defined filters', () => {
        const mockedThis = {
          tableData: {},
        };

        const filters = tableFilterAutocomplete.computed.filters.call(mockedThis);

        expect(filters).toEqual({});
      });
    });

    describe('preselectedItems', () => {
      it('should return preselected items', () => {
        const filterName = 'filterName';
        const mockedThis = {
          filterName,
          filters: {
            [filterName]: ['createOn'],
          },
        };

        const preselectedItems = tableFilterAutocomplete.computed.preselectedItems.call(mockedThis);

        const expectedItems = ['createOn'];

        expect(expectedItems).toEqual(preselectedItems);
      });

      it('should return empty array if not defined filter', () => {
        const filterName = 'filterName';
        const mockedThis = {
          filterName,
          filters: {},
        };

        const preselectedItems = tableFilterAutocomplete.computed.preselectedItems.call(mockedThis);

        expect(preselectedItems).toEqual([]);
      });
    });
  });
  describe('tableFilterAutocomplete methods', () => {
    describe('toggleItem', () => {
      it('should call method selectOneItem and applyFilter', () => {
        const filterName = 'filter';
        const mockedThis = {
          filterName,
          selectOneItem: jest.fn(),
          applyFilter: jest.fn(),
          [filterName]: [
            {
              value: 1,
            },
          ],
          selectedItems: [],
        };

        tableFilterAutocomplete.methods.toggleItem.call(mockedThis, ['value', 1]);

        expect(mockedThis.selectOneItem).toHaveBeenCalled();
        expect(mockedThis.applyFilter).toHaveBeenCalled();
        expect(mockedThis.applyFilter).toHaveBeenCalledWith(mockedThis.selectedItems);
      });
    });
    describe('selectOneItem', () => {
      it('should call $set', () => {
        const filterName = 'filter';
        const mockedThis = {
          $set: jest.fn(),
          filterName,
          [filterName]: [0],
        };

        tableFilterAutocomplete.methods.selectOneItem.call(mockedThis, [0, 'status']);

        expect(mockedThis.$set).toHaveBeenCalled();
      });
    });
    describe('selectAllItem', () => {
      it('should call $set and applyFilters', () => {
        const filterName = 'filter';
        const mockedThis = {
          $set: jest.fn(),
          applyFilter: jest.fn(),
          filterName,
          [filterName]: [
            {
              value: 'value',
            },
          ],
        };

        const itemKeyName = 'value';
        const items = [
          {
            value: 'value',
          },
        ];

        tableFilterAutocomplete.methods.selectAllItem.call(
          mockedThis,
          itemKeyName,
          items,
          'status'
        );

        expect(mockedThis.$set).toHaveBeenCalled();
        expect(mockedThis.applyFilter).toHaveBeenCalled();
      });
    });
    describe('onSelectAllItemDisplayed', () => {
      it('should call selectAllItem with right params', () => {
        const mockedThis = {
          selectAllItem: jest.fn(),
        };
        const itemKeyName = 'value';
        const items = [
          {
            value: 'value',
          },
        ];
        const status = true;

        tableFilterAutocomplete.methods.onSelectAllItemDisplayed.call(mockedThis, {
          itemKeyName,
          items,
        });

        expect(mockedThis.selectAllItem).toHaveBeenCalledWith(itemKeyName, items, status);
      });
    });
    describe('onClearAllItemDisplayed', () => {
      it('should call selectAllItem with right params', () => {
        const mockedThis = {
          selectAllItem: jest.fn(),
        };
        const itemKeyName = 'value';
        const items = [
          {
            value: 'value',
          },
        ];
        const status = false;

        tableFilterAutocomplete.methods.onClearAllItemDisplayed.call(mockedThis, {
          itemKeyName,
          items,
        });

        expect(mockedThis.selectAllItem).toHaveBeenCalledWith(itemKeyName, items, status);
      });
    });
    describe('apply', () => {
      it('should dispatch APPLY_FILTERS', () => {
        const mockedThis = {
          $store: {
            dispatch: jest.fn(),
          },
        };

        tableFilterAutocomplete.methods.apply.call(mockedThis);

        expect(mockedThis.$store.dispatch).toHaveBeenCalled();
      });
    });
    describe('displayPreselectItems', () => {
      it('should call toggleItem method', () => {
        const mockedThis = {
          preselectedItems: [
            {
              id: 1,
            },
          ],
          toggleItem: jest.fn(),
        };

        tableFilterAutocomplete.methods.displayPreselectItems.call(mockedThis, {
          itemKeyName: 'id',
        });

        expect(mockedThis.toggleItem).toHaveBeenCalled();
      });
    });
    describe('onNotFoundItem', () => {
      it('should call getItemList with right params', () => {
        const mockedThis = {
          loading: false,
          $set: jest.fn(),
        };
        const getItemList = jest.fn(() => Promise.resolve());
        const itemKey = 'itemKey';
        const searchField = 'searchField';

        tableFilterAutocomplete.methods.onNotFoundItem.call(mockedThis, {
          itemKey,
          searchField,
          getItemList,
        });

        expect(getItemList).toHaveBeenCalledWith(searchField);
      });
    });
    describe('loadingPreselectedItems', () => {
      it('should call getItemById', async () => {
        const displayedFieldName = 'displayedFieldName';
        const itemKeyName = 'id';
        const data = { data: { displayedFieldName, itemKeyName } };
        const filterName = 'filter';
        const getItemById = await jest.fn(() => data);

        const mockedThis = {
          filterName,
          preselectedItems: [1],
          [filterName]: [
            {
              id: 2,
            },
          ],
          toggleItem: jest.fn(),
        };

        await tableFilterAutocomplete.methods.loadingPreselectedItems.call(mockedThis, {
          itemKeyName,
          displayedFieldName,
          getItemById,
        });

        expect(getItemById).toHaveBeenCalled();
        expect(mockedThis.toggleItem).not.toHaveBeenCalled();
      });

      it('should call toggleItem', async () => {
        const displayedFieldName = 'displayedFieldName';
        const itemKeyName = 'id';
        const data = { data: { displayedFieldName, itemKeyName } };
        const filterName = 'filter';
        const getItemById = await jest.fn(() => data);

        const mockedThis = {
          filterName,
          preselectedItems: [1],
          [filterName]: [
            {
              id: 1,
            },
          ],
          toggleItem: jest.fn(),
        };

        await tableFilterAutocomplete.methods.loadingPreselectedItems.call(mockedThis, {
          itemKeyName,
          displayedFieldName,
          getItemById,
        });

        expect(getItemById).not.toHaveBeenCalled();
        expect(mockedThis.toggleItem).toHaveBeenCalled();
      });
    });
  });

  describe('watch', () => {
    describe('preselectedItems', () => {
      it('should set false for property selected in each filter if passed array empty ', () => {
        const items = [];
        const filterName = 'filter';
        const mockedThis = {
          filterName,
          [filterName]: [
            {
              id: 1,
            },
            {
              id: 3,
            },
          ],
          $set: jest.fn(),
        };

        tableFilterAutocomplete.watch.preselectedItems.call(mockedThis, items);

        expect(mockedThis[filterName][0].selected).toBeFalsy();
        expect(mockedThis[filterName][1].selected).toBeFalsy();
      });

      it('should not call method $set if passed array not empty ', () => {
        const items = [1, 2, 3];
        const mockedThis = {
          $set: jest.fn(),
        };

        tableFilterAutocomplete.watch.preselectedItems.call(mockedThis, items);

        expect(mockedThis.$set).not.toHaveBeenCalled();
      });
    });
  });
});
