import TableFilter from '@/components/TableFilter';
import * as utils from '@/services/utils';

describe('TableFilter: ', () => {
  describe('computed: ', () => {
    describe('optionList: ', () => {
      it('should return searchinOptions', () => {
        const mockedThis = {
          searchFocus: true,
          searchField: '123',
          searchinOptions: [1, 2, 3],
        };

        TableFilter.computed.optionList.call(mockedThis);

        expect(mockedThis.searchinOptions).toEqual([1, 2, 3]);
      });

      it('should return itemDisplayed', () => {
        const mockedThis = {
          searchFocus: true,
          searchField: '',
          itemDisplayed: [1, 2, 3],
        };

        TableFilter.computed.optionList.call(mockedThis);

        expect(mockedThis.itemDisplayed).toEqual([1, 2, 3]);
      });
    });

    describe('itemDisplayed: ', () => {
      it('should return sorted array with a couple of unselected items and all selected items', () => {
        const mockedThis = {
          listSize: 7,
          listSizeSelectedItems: 3,
          selectedItems: [11, 12, 13],
          unselectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        };

        const result = TableFilter.computed.itemDisplayed.call(mockedThis);

        expect(result).toEqual([1, 11, 12, 13, 2, 3, 4]);
      });

      it('should return sorted array of selected items', () => {
        const mockedThis = {
          listSize: 7,
          listSizeSelectedItems: 7,
          selectedItems: [12, 11, 13],
          unselectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        };

        const result = TableFilter.computed.itemDisplayed.call(mockedThis);

        expect(result).toEqual([11, 12, 13]);
      });
    });

    describe('unselectedItems: ', () => {
      it('should return array of unselected items', () => {
        const mockedThis = {
          items: [
            {
              id: 1,
              selected: false,
            },
            {
              id: 2,
            },
            {
              id: 4,
              selected: true,
            },
          ],
        };

        const result = TableFilter.computed.unselectedItems.call(mockedThis);

        const expectedResult = [
          { id: 1, selected: false },
          {
            id: 2,
          },
        ];

        expect(result).toEqual(expectedResult);
      });
    });

    describe('listSizeSelectedItems: ', () => {
      it('should return array length', () => {
        const mockedThis = {
          selectedItems: [1, 2, 3, 4, 5],
        };

        const result = TableFilter.computed.listSizeSelectedItems.call(mockedThis);

        expect(result).toEqual(5);
      });
    });

    describe('selectedItemsForTitle: ', () => {
      it('should call getStringFromValuesByKey with parameters', () => {
        const DISPLAYED_ITEMS_IN_TITLE = 3;

        const mockedThis = {
          name: 'Alex',
          selectedItems: [1, 2, 3],
          isShowTitleWithItems: jest.fn(() => true),
        };

        utils.getStringFromValuesByKey = jest.fn();

        TableFilter.computed.selectedItemsForTitle.call(mockedThis);

        expect(utils.getStringFromValuesByKey).toHaveBeenCalledWith(
          mockedThis.name,
          mockedThis.selectedItems,
          DISPLAYED_ITEMS_IN_TITLE
        );
      });

      it('should return title with dots if method isShowTitleWithItems returned true', () => {
        const title = 'test title';

        const mockedThis = {
          name: 'Alex',
          selectedItems: [1, 2, 3],
          isShowTitleWithItems: jest.fn(() => true),
        };

        utils.getStringFromValuesByKey = jest.fn(() => title);

        const result = TableFilter.computed.selectedItemsForTitle.call(mockedThis);

        expect(result).toEqual(`: ${title}`);
      });

      it('should return title without dots if method isShowTitleWithItems returned false', () => {
        const title = 'test title';

        const mockedThis = {
          name: 'Alex',
          selectedItems: [1, 2, 3],
          isShowTitleWithItems: jest.fn(() => false),
        };

        utils.getStringFromValuesByKey = jest.fn(() => title);

        const result = TableFilter.computed.selectedItemsForTitle.call(mockedThis);

        expect(result).toEqual(title);
      });
    });

    describe('selectedItems: ', () => {
      it('should return only selected items', () => {
        const mockedThis = {
          items: [
            { id: 1, name: 'Alabama', value: 'AL', selected: true },
            { id: 2, name: 'Alaska', value: 'AK' },
            { id: 3, name: 'Arizona', value: 'AZ', selected: true },
            { id: 4, name: 'Arkansas', value: 'AR' },
          ],
        };

        const selectedItems = TableFilter.computed.selectedItems.call(mockedThis);

        const expectedSelectedItems = [
          { id: 1, name: 'Alabama', value: 'AL', selected: true },
          { id: 3, name: 'Arizona', value: 'AZ', selected: true },
        ];

        expect(expectedSelectedItems).toEqual(selectedItems);
      });
    });

    describe('searchinOptions: ', () => {
      it('should call exactMatchSearch', () => {
        const stateList = [
          { id: 1, name: 'Alabama', value: 'AL' },
          { id: 2, name: 'Alaska', value: 'AK' },
          { id: 3, name: 'Arizona', value: 'AZ' },
          { id: 4, name: 'Arkansas', value: 'AR' },
        ];

        const mockedThis = {
          listSize: 2,
          exactMatchSearch: jest.fn(() => stateList),
          occurrenceSearch: jest.fn(() => stateList),
        };

        const result = TableFilter.computed.searchinOptions.call(mockedThis);

        const expectedSelectedItems = [
          { id: 1, name: 'Alabama', value: 'AL' },
          { id: 2, name: 'Alaska', value: 'AK' },
        ];

        expect(mockedThis.exactMatchSearch).toHaveBeenCalled();
        expect(mockedThis.occurrenceSearch).not.toHaveBeenCalled();
        expect(result).toEqual(expectedSelectedItems);
      });

      it('should call exactMatchSearch and occurrenceSearch', () => {
        const stateList = [
          { id: 1, name: 'Alabama', value: 'AL' },
          { id: 2, name: 'Alaska', value: 'AK' },
          { id: 3, name: 'Arizona', value: 'AZ' },
          { id: 4, name: 'Arkansas', value: 'AR' },
        ];

        const mockedThis = {
          listSize: 2,
          exactMatchSearch: jest.fn(() => 0),
          occurrenceSearch: jest.fn(() => stateList),
        };

        const result = TableFilter.computed.searchinOptions.call(mockedThis);

        const expectedSelectedItems = [
          { id: 1, name: 'Alabama', value: 'AL' },
          { id: 2, name: 'Alaska', value: 'AK' },
        ];

        expect(mockedThis.exactMatchSearch).toHaveBeenCalled();
        expect(mockedThis.occurrenceSearch).toHaveBeenCalled();
        expect(result).toEqual(expectedSelectedItems);
      });

      it('should return empty array if method exactMatchSearch and occurrenceSearch return zero', () => {
        const mockedThis = {
          listSize: 2,
          exactMatchSearch: jest.fn(() => 0),
          occurrenceSearch: jest.fn(() => 0),
        };

        const result = TableFilter.computed.searchinOptions.call(mockedThis);

        expect(mockedThis.exactMatchSearch).toHaveBeenCalled();
        expect(mockedThis.occurrenceSearch).toHaveBeenCalled();
        expect(result).toEqual([]);
      });
    });

    describe('isClearSelectedDisabled: ', () => {
      it('should return true if selectedItems is empty', () => {
        const mockedThis = {
          selectedItems: '',
        };

        const result = TableFilter.computed.isClearSelectedDisabled.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if selectedItems is not empty', () => {
        const mockedThis = {
          selectedItems: '1234567',
        };

        const result = TableFilter.computed.isClearSelectedDisabled.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });
  });

  describe('methods: ', () => {
    describe('search: ', () => {
      it('should call event notFound, because item not found', () => {
        const mockedThis = {
          searchinOptions: [],
          $emit: jest.fn(),
          itemKey: 'name',
          searchField: '_03',
        };

        TableFilter.methods.search.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('notFound', {
          itemKey: mockedThis.itemKey,
          searchField: mockedThis.searchField,
        });
      });

      it('no change because no search phrase is entered', () => {
        const mockedThis = {
          searchinOptions: [],
          $emit: jest.fn(),
          itemKey: 'name',
          searchField: '',
        };

        TableFilter.methods.search.call(mockedThis);

        expect(mockedThis.$emit).not.toHaveBeenCalled();
      });
    });

    describe('exactMatchSearch: ', () => {
      it('should filter data', () => {
        const mockedThis = {
          items: [
            { id: 3, name: 'Arizona', value: 'AZ' },
            { id: 4, name: 'Arkansas', value: 'AR' },
          ],
          name: 'name',
          searchField: 'Ariz',
          compareStr: jest.fn(() => true),
        };

        const result = TableFilter.methods.exactMatchSearch.call(mockedThis);

        expect(mockedThis.compareStr).toHaveBeenCalledWith('Arizona', 'Ariz');
        expect(mockedThis.compareStr).toHaveBeenCalledWith('Arkansas', 'Ariz');
        expect(result).toEqual(mockedThis.items);
      });

      it('should return 0 if item not found', () => {
        const mockedThis = {
          items: [
            { id: 3, name: 'Arizona', value: 'AZ' },
            { id: 4, name: 'Arkansas', value: 'AR' },
          ],
          name: 'name',
          searchField: 'QWERT',
          compareStr: jest.fn(() => false),
        };

        const result = TableFilter.methods.exactMatchSearch.call(mockedThis);

        expect(mockedThis.compareStr).toHaveBeenCalledWith('Arizona', 'QWERT');
        expect(mockedThis.compareStr).toHaveBeenCalledWith('Arkansas', 'QWERT');
        expect(result).toEqual(0);
      });
    });

    describe('occurrenceSearch: ', () => {
      it('should filter data', () => {
        const mockedThis = {
          items: [
            { id: 4, name: 'Arkansas', value: 'AR' },
            { id: 33, name: 'North Carolina', value: 'NC' },
            { id: 40, name: 'South Carolina', value: 'SC' },
          ],
          name: 'name',
          searchField: 'Ol',
        };

        const result = TableFilter.methods.occurrenceSearch.call(mockedThis);

        const expectedSelectedItems = [
          { id: 33, name: 'North Carolina', value: 'NC' },
          { id: 40, name: 'South Carolina', value: 'SC' },
        ];

        expect(result).toEqual(expectedSelectedItems);
      });

      it('should return 0 if item not found', () => {
        const mockedThis = {
          items: [
            { id: 4, name: 'Arkansas', value: 'AR' },
            { id: 33, name: 'North Carolina', value: 'NC' },
            { id: 40, name: 'South Carolina', value: 'SC' },
          ],
          name: 'name',
          searchField: '132',
        };

        const result = TableFilter.methods.occurrenceSearch.call(mockedThis);

        expect(result).toEqual(0);
      });
    });

    describe('compareStr: ', () => {
      it('should return true if passed string equal', () => {
        const result = TableFilter.methods.compareStr.call(null, 'North Carolina', 'North');
        expect(result).toBeTruthy();
      });

      it('should return false if passed string not equal', () => {
        const result = TableFilter.methods.compareStr.call(null, 'North Carolina', 'South');
        expect(result).not.toBeTruthy();
      });
    });

    describe('onClickItem: ', () => {
      it('should call event select with selected item', () => {
        const itemKey = 'itemKey';

        const item = {
          [itemKey]: 123,
        };

        const mockedThis = {
          $emit: jest.fn(),
          itemKey,
        };

        TableFilter.methods.onClickItem.call(mockedThis, item);

        expect(mockedThis.$emit).toHaveBeenCalledWith('select', {
          itemKeyName: itemKey,
          itemKeyVal: item[itemKey],
        });
      });
    });

    describe('onSelectAllItemDisplayed: ', () => {
      it('should call event selectAll with options found if searchField has text', () => {
        const itemKey = 'itemKey';
        const searchinOptions = [1, 2, 3];

        const mockedThis = {
          $emit: jest.fn(),
          reset: jest.fn(),
          itemKey,
          searchField: '123',
          searchinOptions,
        };

        TableFilter.methods.onSelectAllItemDisplayed.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('selectAll', {
          itemKeyName: itemKey,
          items: searchinOptions,
        });
        expect(mockedThis.reset).toHaveBeenCalled();
      });

      it('should call event selectAll with options found if searchField is empty', () => {
        const itemKey = 'itemKey';
        const itemDisplayed = [4, 5, 6];

        const mockedThis = {
          $emit: jest.fn(),
          reset: jest.fn(),
          itemKey,
          searchField: '',
          itemDisplayed,
        };

        TableFilter.methods.onSelectAllItemDisplayed.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('selectAll', {
          itemKeyName: itemKey,
          items: itemDisplayed,
        });
        expect(mockedThis.reset).toHaveBeenCalled();
      });
    });

    describe('onClearAllItemDisplayed: ', () => {
      it('should call event clearAll with selected items', () => {
        const itemKey = 'itemKey';
        const itemDisplayed = [4, 5, 6];

        const mockedThis = {
          $emit: jest.fn(),
          reset: jest.fn(),
          itemKey,
          searchField: '',
          itemDisplayed,
        };

        TableFilter.methods.onClearAllItemDisplayed.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('clearAll', {
          itemKeyName: itemKey,
          items: itemDisplayed,
        });
        expect(mockedThis.reset).toHaveBeenCalled();
      });
    });

    describe('reset: ', () => {
      it('should clear searchField and disable searchFocus', () => {
        const mockedThis = {
          searchFocus: true,
          searchField: '123',
        };

        TableFilter.methods.reset.call(mockedThis);

        expect(mockedThis.searchFocus).toBeFalsy();
        expect(mockedThis.searchField).toBeFalsy();
      });
    });

    describe('showFilter: ', () => {
      it('should set minimum filter width and call method checkAndShow', () => {
        const mockedThis = {
          minWidthFilterEditor: null,
          $refs: {
            tableFilter: {
              offsetWidth: 100,
            },
          },
          checkAndShow: jest.fn(),
        };

        TableFilter.methods.showFilter.call(mockedThis);

        expect(mockedThis.minWidthFilterEditor).toEqual('100px');
        expect(mockedThis.checkAndShow).toHaveBeenCalled();
      });
    });

    describe('hideFilter: ', () => {
      it('should set minimum filter width and call method onHide', () => {
        const mockedThis = {
          minWidthFilterEditor: null,
          onHide: jest.fn(),
        };

        TableFilter.methods.hideFilter.call(mockedThis);

        expect(mockedThis.minWidthFilterEditor).toEqual('auto');
        expect(mockedThis.onHide).toHaveBeenCalled();
      });
    });

    describe('sortItems', () => {
      it('should return 1 if passed number currentItem more nextItem', () => {
        const mockedThis = {
          name: 'id',
        };

        const currentItem = { id: 11 };
        const nextItem = { id: 10 };

        const result = TableFilter.methods.sortItems.call(mockedThis, currentItem, nextItem);

        expect(result).toEqual(1);
      });

      it('should return -1 if passed number nextItem more currentItem', () => {
        const mockedThis = {
          name: 'id',
        };

        const currentItem = { id: 10 };
        const nextItem = { id: 11 };

        const result = TableFilter.methods.sortItems.call(mockedThis, currentItem, nextItem);

        expect(result).toEqual(-1);
      });

      it('should return 0 if passed number nextItem and currentItem is equal', () => {
        const mockedThis = {
          name: 'id',
        };

        const currentItem = { id: 10 };
        const nextItem = { id: 10 };

        const result = TableFilter.methods.sortItems.call(mockedThis, currentItem, nextItem);

        expect(result).toEqual(0);
      });
    });

    describe('isShowTitleWithItems: ', () => {
      it('should return true if title and passed parameter is not empty', () => {
        const text = 'qwerty';

        const mockedThis = {
          title: 'qweert',
        };

        const result = TableFilter.methods.isShowTitleWithItems.call(mockedThis, text);

        expect(result).toBeTruthy();
      });

      it('should return false if title or passed parameter is empty', () => {
        const text = 'qwerty';

        const mockedThis = {
          title: '',
        };

        const result = TableFilter.methods.isShowTitleWithItems.call(mockedThis, text);

        expect(result).toBeFalsy();
      });
    });
  });
});
