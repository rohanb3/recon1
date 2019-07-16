import lazyLoadTable from '@/mixins/lazyLoadTable';
import { LOAD_ITEMS } from '@/store/storage/actionTypes';

const tableName = 'test';

describe('lazyLoadTable mixin: ', () => {
  describe('mounted', () => {
    it('should call loadItems if defined initialLoad as true', () => {
      const mockedThis = {
        loadItems: jest.fn(),
        initialLoad: true,
      };

      lazyLoadTable.mounted.call(mockedThis);

      expect(mockedThis.loadItems).toHaveBeenCalled();
    });

    it('should not call loadItems if defined initialLoad as false', () => {
      const mockedThis = {
        loadItems: jest.fn(),
        initialLoad: false,
      };

      lazyLoadTable.mounted.call(mockedThis);

      expect(mockedThis.loadItems).not.toHaveBeenCalled();
    });
  });

  describe('beforeDestroy', () => {
    it('should call resetItems and resetFilters if defined resetDataBeforeLeave as true', () => {
      const mockedThis = {
        resetItems: jest.fn(),
        resetFilters: jest.fn(),
        resetDataBeforeLeave: true,
      };

      lazyLoadTable.beforeDestroy.call(mockedThis);

      expect(mockedThis.resetItems).toHaveBeenCalled();
      expect(mockedThis.resetFilters).toHaveBeenCalled();
    });

    it('should call resetItems and resetFilters if defined resetDataBeforeLeave as false', () => {
      const mockedThis = {
        resetItems: jest.fn(),
        resetFilters: jest.fn(),
        resetDataBeforeLeave: false,
      };

      lazyLoadTable.beforeDestroy.call(mockedThis);

      expect(mockedThis.resetItems).not.toHaveBeenCalled();
      expect(mockedThis.resetFilters).not.toHaveBeenCalled();
    });
  });

  describe('checkAndLoadItems(): ', () => {
    it('should do nothing if all aitems were loaded', () => {
      const mockedThis = {
        allItemsLoaded: true,
        loadMoreItems: jest.fn(),
        tableName,
      };

      lazyLoadTable.methods.checkAndLoadItems.call(mockedThis);

      expect(mockedThis.loadMoreItems).not.toHaveBeenCalled();
    });

    it('should load more items if not all were loaded', () => {
      const mockedThis = {
        allItemsLoaded: false,
        loadMoreItems: jest.fn(),
      };

      lazyLoadTable.methods.checkAndLoadItems.call(mockedThis);

      expect(mockedThis.loadMoreItems).toHaveBeenCalled();
    });
  });

  describe('loadItems(): ', () => {
    it('should load actions', () => {
      const filters = {};
      const mockedThis = {
        $store: {
          dispatch: jest.fn(() => Promise.resolve()),
        },
        tableName,
        filters,
        loading: false,
      };

      const loadingPromise = lazyLoadTable.methods.loadItems.call(mockedThis);

      expect(mockedThis.loading).toBeTruthy();

      return loadingPromise.then(() => {
        expect(mockedThis.loading).toBeFalsy();
        expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(LOAD_ITEMS, {
          itemType: tableName,
          filters,
        });
      });
    });
  });
});
