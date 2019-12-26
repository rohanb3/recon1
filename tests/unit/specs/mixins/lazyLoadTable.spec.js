import lazyLoadTable from '@/mixins/lazyLoadTable';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { RESET_ITEMS } from '@/store/storage/mutationTypes';
import { RESET_FILTERS } from '@/store/tables/mutationTypes';
import { FILTER_NAMES, SORTING_DIRECTION } from '@/constants';

const tableName = 'test';

describe('lazyLoadTable mixin: ', () => {
  describe('mounted', () => {
    it('should call applyFilters if defined initialLoad as true', () => {
      const mockedThis = {
        applyFilters: jest.fn(),
        initialLoad: true,
        $route: {
          params: {},
        },
      };

      lazyLoadTable.mounted.call(mockedThis);

      expect(mockedThis.applyFilters).toHaveBeenCalled();
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

  describe('computed', () => {
    describe('allItemsLoaded', () => {
      it('should return true if all items loaded', () => {
        const mockedThis = {
          tableName,
          storageData: jest.fn(() => ({ allItemsLoaded: true })),
        };

        const result = lazyLoadTable.computed.allItemsLoaded.call(mockedThis);

        expect(result).toBeTruthy();
      });
    });

    describe('totalItems', () => {
      it('should return total items', () => {
        const mockedThis = {
          tableName,
          storageData: jest.fn(() => ({ total: 7 })),
        };

        const result = lazyLoadTable.computed.totalItems.call(mockedThis);

        expect(result).toEqual(7);
      });
    });

    describe('filters', () => {
      it('should return object with filters if filters is not empty', () => {
        const filters = { id: 7 };
        const mockedThis = {
          tableName,
          tableData: jest.fn(() => ({ filters })),
        };

        const result = lazyLoadTable.computed.filters.call(mockedThis);

        expect(result).toEqual(filters);
      });

      it('should return empty object if filters is empty', () => {
        const mockedThis = {
          tableName,
          tableData: jest.fn(() => ({})),
        };

        const result = lazyLoadTable.computed.filters.call(mockedThis);

        expect(result).toEqual({});
      });

      describe('sortingField', () => {
        it('should return sort field', () => {
          const mockedThis = {
            filters: {
              [FILTER_NAMES.SORT]: 'dayField',
            },
          };

          const result = lazyLoadTable.computed.sortingField.call(mockedThis);

          expect(result).toEqual('dayField');
        });
      });

      describe('sortDirection', () => {
        it('should return sort direction', () => {
          const mockedThis = {
            filters: {
              [FILTER_NAMES.ORDER]: 'DESC',
            },
          };

          const result = lazyLoadTable.computed.sortDirection.call(mockedThis);

          expect(result).toEqual('DESC');
        });
      });

      describe('role', () => {
        it('should return role name', () => {
          const mockedThis = {
            $store: {
              getters: {
                role: 'admin',
              },
            },
          };

          const result = lazyLoadTable.computed.role.call(mockedThis);

          expect(result).toEqual('admin');
        });
      });

      describe('applyingFilters', () => {
        it('should return boolean value', () => {
          const mockedThis = {
            tableData: jest.fn(() => ({ applyingFilters: true })),
          };

          const result = lazyLoadTable.computed.applyingFilters.call(mockedThis);

          expect(result).toBeTruthy();
        });
      });

      describe('tableRows', () => {
        it('should return array if defined isContainRows as true', () => {
          const rows = [1, 2, 3];
          const mockedThis = {
            isContainRows: true,
            rows,
          };

          const result = lazyLoadTable.computed.tableRows.call(mockedThis);

          expect(result).toEqual(rows);
        });

        it('should return array from storage if defined isContainRows as false', () => {
          const items = [1, 2, 3];
          const mockedThis = {
            isContainRows: false,
            storageData: jest.fn(() => ({ items })),
          };

          const result = lazyLoadTable.computed.tableRows.call(mockedThis);

          expect(result).toEqual(items);
        });

        it('should return empty array if not defined isContainRows and storageData', () => {
          const mockedThis = {
            isContainRows: false,
            storageData: jest.fn(() => ({})),
          };

          const result = lazyLoadTable.computed.tableRows.call(mockedThis);

          expect(result).toEqual([]);
        });
      });

      describe('isContainRows', () => {
        it('should return length of the string if defined rows', () => {
          const mockedThis = {
            rows: 'qwerty',
          };

          const result = lazyLoadTable.computed.isContainRows.call(mockedThis);

          expect(result).toEqual(6);
        });
      });

      describe('tableColumns', () => {
        it('should return object if defined isContainColumns as true', () => {
          const columns = { id: 7 };
          const mockedThis = {
            isContainColumns: true,
            columns,
          };

          const result = lazyLoadTable.computed.tableColumns.call(mockedThis);

          expect(result).toEqual(columns);
        });

        it('should return object from storage if defined isContainColumns as false', () => {
          const columns = { id: 7 };
          const mockedThis = {
            isContainColumns: false,
            tableData: jest.fn(() => ({ columns })),
          };

          const result = lazyLoadTable.computed.tableColumns.call(mockedThis);

          expect(result).toEqual(columns);
        });
      });

      describe('isContainColumns', () => {
        it('should return length of the string if defined columns', () => {
          const mockedThis = {
            columns: 'qwerty',
          };

          const result = lazyLoadTable.computed.isContainColumns.call(mockedThis);

          expect(result).toEqual(6);
        });
      });

      describe('tableNameLowerCase', () => {
        it('should return table name in lowercase', () => {
          const mockedThis = {
            tableName: 'QWerTY',
          };

          const result = lazyLoadTable.computed.tableNameLowerCase.call(mockedThis);

          expect(result).toEqual('qwerty');
        });
      });
    });
  });

  describe('methods', () => {
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

    describe('loadMoreItems(): ', () => {
      it('should call actions LOAD_MORE_ITEMS', () => {
        const filters = { date: '2019.06.01' };
        const mockedThis = {
          loading: true,
          loadOptions: 123,
          tableName,
          filters,
          $store: {
            dispatch: jest.fn(() => ({ finally: jest.fn() })),
          },
        };

        lazyLoadTable.methods.loadMoreItems.call(mockedThis);

        const expectedResult = {
          itemType: tableName,
          filters,
        };

        expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(LOAD_MORE_ITEMS, expectedResult);
      });

      it('After load items should set loading as false', () => {
        const finallyMock = jest.fn(func => func());
        const mockedThis = {
          loading: true,
          loadOptions: 123,
          tableName,

          $store: {
            dispatch: jest.fn(() => ({ finally: finallyMock })),
          },
        };

        lazyLoadTable.methods.loadMoreItems.call(mockedThis);

        expect(mockedThis.loading).toBeFalsy();
      });
    });

    describe('resetItems(): ', () => {
      it('should call mutation RESET_ITEMS', () => {
        const mockedThis = {
          $store: {
            commit: jest.fn(),
          },
          tableName,
        };

        lazyLoadTable.methods.resetItems.call(mockedThis);

        expect(mockedThis.$store.commit).toHaveBeenCalledWith(RESET_ITEMS, tableName);
      });
    });

    describe('applyFilters(): ', () => {
      it('should call action APPLY_FILTERS with parameters', () => {
        const mockedThis = {
          $store: {
            dispatch: jest.fn(),
          },
          tableName,
        };

        const id = { id: 12 };
        const date = { date: '2019.06.01' };

        lazyLoadTable.methods.applyFilters.call(mockedThis, id, date);

        const expectedData = {
          tableName,
          filters: [id, date],
        };
        expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(APPLY_FILTERS, expectedData);
      });
    });

    describe('resetFilters(): ', () => {
      it('should call mutation RESET_FILTERS', () => {
        const mockedThis = {
          $store: {
            commit: jest.fn(),
          },
          tableName,
        };

        lazyLoadTable.methods.resetFilters.call(mockedThis);

        expect(mockedThis.$store.commit).toHaveBeenCalledWith(RESET_FILTERS, tableName);
      });
    });

    describe('onSortDirectionChanged(): ', () => {
      it('should call method applyFilters and set direction by desc if passed direction asc', () => {
        const sortingFieldName = 'dateField';

        const mockedThis = {
          sortDirection: SORTING_DIRECTION.ASC,
          sortingField: 'dateField',
          applyFilters: jest.fn(),
        };

        lazyLoadTable.methods.onSortDirectionChanged.call(mockedThis, sortingFieldName);

        expect(mockedThis.applyFilters).toHaveBeenCalledWith({
          name: FILTER_NAMES.ORDER,
          value: SORTING_DIRECTION.DESC,
        });
      });

      it('should call method applyFilters and reset sorting', () => {
        const sortingFieldName = 'dateField';

        const mockedThis = {
          sortDirection: SORTING_DIRECTION.DESC,
          sortingField: 'dateField',
          applyFilters: jest.fn(),
        };

        lazyLoadTable.methods.onSortDirectionChanged.call(mockedThis, sortingFieldName);

        expect(mockedThis.applyFilters).toHaveBeenCalledWith(
          { name: FILTER_NAMES.SORT, value: null },
          { name: FILTER_NAMES.ORDER, value: null }
        );
      });

      it('should call method applyFilters and set direction by asc if direction unknown', () => {
        const sortingFieldName = 'dateField';

        const mockedThis = {
          sortDirection: null,
          sortingField: null,
          applyFilters: jest.fn(),
        };

        lazyLoadTable.methods.onSortDirectionChanged.call(mockedThis, sortingFieldName);

        expect(mockedThis.applyFilters).toHaveBeenCalledWith(
          { name: FILTER_NAMES.SORT, value: 'dateField' },
          { name: FILTER_NAMES.ORDER, value: SORTING_DIRECTION.ASC }
        );
      });

      it('should set direction by asc if current sortable field not equal with previous sortable field', () => {
        const sortingFieldName = 'nameField';

        const mockedThis = {
          sortDirection: SORTING_DIRECTION.ASC,
          sortingField: 'dateField',
          applyFilters: jest.fn(),
        };

        lazyLoadTable.methods.onSortDirectionChanged.call(mockedThis, sortingFieldName);

        expect(mockedThis.applyFilters).toHaveBeenCalledWith(
          { name: FILTER_NAMES.SORT, value: 'nameField' },
          { name: FILTER_NAMES.ORDER, value: SORTING_DIRECTION.ASC }
        );
      });
    });
  });
});
