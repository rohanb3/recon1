import TableFilter from '@/components/TableFilter';

describe('TableFilter: ', () => {
  describe('computed.optionList: ', () => {
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

  describe('search: ', () => {
    it('should call exactMatchSearch', () => {
      const listSize = 2;

      const stateList = [
        { id: 1, name: 'Alabama', value: 'AL' },
        { id: 2, name: 'Alaska', value: 'AK' },
        { id: 3, name: 'Arizona', value: 'AZ' },
        { id: 4, name: 'Arkansas', value: 'AR' },
      ];

      const mockedThis = {
        searchField: 'ar',
        exactMatchSearch: jest.fn(() => stateList),
        occurrenceSearch: jest.fn(() => stateList),
        $emit: jest.fn(),
        listSize,
        searchinOptions: [],
      };

      TableFilter.methods.search.call(mockedThis);

      const expectedSelectedItems = [
        { id: 1, name: 'Alabama', value: 'AL' },
        { id: 2, name: 'Alaska', value: 'AK' },
      ];

      expect(mockedThis.exactMatchSearch).toHaveBeenCalled();
      expect(mockedThis.$emit).not.toHaveBeenCalledWith('notFound', 'ar');
      expect(mockedThis.occurrenceSearch).not.toHaveBeenCalled();
      expect(expectedSelectedItems).toEqual(mockedThis.searchinOptions);
      expect(mockedThis.searchinOptions).toHaveLength(listSize);
    });

    it('should call exactMatchSearch and occurrenceSearch', () => {
      const listSize = 2;
      const mockedThis = {
        searchField: 'ol',
        exactMatchSearch: jest.fn(() => 0),
        occurrenceSearch: jest.fn(() => [{}, {}, {}]),
        $emit: jest.fn(),
        listSize,
        searchinOptions: [],
      };

      TableFilter.methods.search.call(mockedThis);

      expect(mockedThis.exactMatchSearch).toHaveBeenCalled();
      expect(mockedThis.$emit).not.toHaveBeenCalledWith('notFound', 'ol');
      expect(mockedThis.occurrenceSearch).toHaveBeenCalled();
      expect(mockedThis.searchinOptions).toHaveLength(listSize);
    });

    it('no change because no search phrase is entered', () => {
      const mockedThis = {
        searchField: '',
        exactMatchSearch: jest.fn(() => []),
        occurrenceSearch: jest.fn(() => []),
        $emit: jest.fn(),
        listSize: 2,
        searchinOptions: [],
      };

      TableFilter.methods.search.call(mockedThis);

      expect(mockedThis.exactMatchSearch).not.toHaveBeenCalled();
      expect(mockedThis.$emit).not.toHaveBeenCalledWith('notFound', 'ar');
      expect(mockedThis.occurrenceSearch).not.toHaveBeenCalled();
      expect([]).toEqual(mockedThis.searchinOptions);
    });

    it('should call event notFound, because item not found', () => {
      const mockedThis = {
        searchField: '123',
        exactMatchSearch: jest.fn(() => 0),
        occurrenceSearch: jest.fn(() => 0),
        $emit: jest.fn(),
        listSize: 2,
        searchinOptions: [],
        itemKey: 'id',
      };

      TableFilter.methods.search.call(mockedThis);

      expect(mockedThis.exactMatchSearch).toHaveBeenCalled();
      expect(mockedThis.occurrenceSearch).toHaveBeenCalled();
      expect(mockedThis.$emit).toHaveBeenCalledWith('notFound', expect.any(Object));
      expect([]).toEqual(mockedThis.searchinOptions);
    });
  });

  describe('exactMatchSearch: ', () => {
    it('should filter data', () => {
      const mockedThis = {
        unselectedItems: [
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
      expect(result).toEqual(mockedThis.unselectedItems);
    });

    it('should return 0 if item not found', () => {
      const mockedThis = {
        unselectedItems: [
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
        unselectedItems: [
          { id: 4, name: 'Arkansas', value: 'AR' },
          { id: 33, name: 'North Carolina', value: 'NC' },
          { id: 40, name: 'South Carolina', value: 'SC' },
        ],
        name: 'name',
        searchField: 'Ol',
        compareStr: jest.fn(() => true),
      };

      const result = TableFilter.methods.occurrenceSearch.call(mockedThis);

      expect(mockedThis.compareStr).toHaveBeenCalledWith(
        mockedThis.unselectedItems[0].name,
        mockedThis.searchField,
        true
      );
      expect(result).toEqual(mockedThis.unselectedItems);
    });

    it('should return 0 if item not found', () => {
      const mockedThis = {
        unselectedItems: [
          { id: 4, name: 'Arkansas', value: 'AR' },
          { id: 33, name: 'North Carolina', value: 'NC' },
          { id: 40, name: 'South Carolina', value: 'SC' },
        ],
        name: 'name',
        searchField: '132',
        compareStr: jest.fn(() => false),
      };

      const result = TableFilter.methods.occurrenceSearch.call(mockedThis);

      expect(mockedThis.compareStr).toHaveBeenCalledWith(
        mockedThis.unselectedItems[0].name,
        mockedThis.searchField,
        true
      );

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
});
