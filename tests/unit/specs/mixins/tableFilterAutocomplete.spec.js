import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

// import { APPLY_FILTERS } from '@/store/tables/actionTypes';
// import { extractPropertiesFromArrObj } from '@/services/utils';

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
  });
});
