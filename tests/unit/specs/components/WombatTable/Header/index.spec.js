import Header, {
  HEADER_CELL_ELLIPSIS_ALWAYS,
  COLUMN_DEFAULT_MIN_WIDTH,
  HEADER_CELL_ELLIPSIS_SMART,
} from '@/components/WombatTable/Header';

describe('WombatTable:Header: ', () => {
  describe('computed: ', () => {
    describe('globalStyles', () => {
      it('should return object with width in px if width defined', () => {
        const mockedThis = {
          width: 100,
        };

        const result = Header.computed.globalStyles.call(mockedThis);

        expect(result).toEqual({ width: '100px' });
      });

      it('should return object with width in procent if width not defined', () => {
        const result = Header.computed.globalStyles();

        expect(result).toEqual({ width: '100%' });
      });
    });

    describe('isColumnsEllipsisModeAlways', () => {
      it('should return true if header cell ellipsis always', () => {
        const mockedThis = {
          columnsEllipsisMode: HEADER_CELL_ELLIPSIS_ALWAYS,
        };

        const result = Header.computed.isColumnsEllipsisModeAlways.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if header cell not ellipsis always', () => {
        const mockedThis = {
          columnsEllipsisMode: false,
        };

        const result = Header.computed.isColumnsEllipsisModeAlways.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('tableNameIdentificator', () => {
      it('should return custome table name identificator if defined name', () => {
        const mockedThis = {
          name: 'company-table',
        };

        const result = Header.computed.tableNameIdentificator.call(mockedThis);

        expect(result).toEqual('wombat-columns-styles-company-table');
      });

      it('should return default table name identificator if not defined name', () => {
        const mockedThis = {
          name: '',
        };

        const result = Header.computed.tableNameIdentificator.call(mockedThis);

        expect(result).toEqual('wombat-columns-styles');
      });
    });

    describe('preparedColumns', () => {
      it('should return empty array if defined columns as empty array', () => {
        const mockedThis = {
          columns: [],
        };

        const result = Header.computed.preparedColumns.get.call(mockedThis);

        expect(result).toEqual([]);
      });

      it('should return columns setting with width if defined width in pixels', () => {
        const mockedThis = {
          columns: [
            {
              width: '50px',
              minWidth: 10,
              name: 'city',
            },
          ],
        };

        const result = Header.computed.preparedColumns.get.call(mockedThis);

        const expectedResult = [
          {
            _className: 'column-city',
            _machineName: 'city',
            _minWidth: 10,
            _style: { 'min-width': '10px', width: '50px' },
            _width: 50,
            _widthProportion: undefined,
            minWidth: 10,
            name: 'city',
            width: '50px',
          },
        ];

        expect(result).toEqual(expectedResult);
      });

      it('should return columns setting with width if defined width', () => {
        const mockedThis = {
          columns: [
            {
              width: 120,
              minWidth: 40,
              name: 'country',
            },
          ],
        };

        const result = Header.computed.preparedColumns.get.call(mockedThis);

        const expectedResult = [
          {
            _className: 'column-country',
            _machineName: 'country',
            _minWidth: 40,
            _style: { flex: 120, 'min-width': '40px' },
            _width: undefined,
            _widthProportion: 120,
            minWidth: 40,
            name: 'country',
            width: 120,
          },
        ];

        expect(result).toEqual(expectedResult);
      });

      it('should return columns setting with flex if not defined width', () => {
        const mockedThis = {
          columns: [
            {
              minWidth: 40,
              name: 'country',
            },
          ],
        };

        const result = Header.computed.preparedColumns.get.call(mockedThis);

        const expectedResult = [
          {
            _className: 'column-country',
            _machineName: 'country',
            _minWidth: 40,
            _style: { flex: 1, 'min-width': '40px' },
            _width: undefined,
            _widthProportion: 1,
            minWidth: 40,
            name: 'country',
          },
        ];

        expect(result).toEqual(expectedResult);
      });

      it('should return columns setting with default minWidth if not defined minWidth', () => {
        const mockedThis = {
          columns: [
            {
              name: 'country',
            },
          ],
        };

        const result = Header.computed.preparedColumns.get.call(mockedThis);

        const expectedResult = [
          {
            _className: 'column-country',
            _machineName: 'country',
            _minWidth: 50,
            _style: { flex: 1, 'min-width': '50px' },
            _width: undefined,
            _widthProportion: 1,
            name: 'country',
          },
        ];

        expect(result._minWidth).toEqual(COLUMN_DEFAULT_MIN_WIDTH);
        expect(result).toEqual(expectedResult);
      });

      it('should return columns setting with default machineName if not defined name', () => {
        const mockedThis = {
          columns: [
            {
              minWidth: 40,
            },
          ],
        };

        const result = Header.computed.preparedColumns.get.call(mockedThis);

        const expectedResult = [
          {
            _className: 'column-column0',
            _machineName: 'column0',
            _minWidth: 40,
            _style: { flex: 1, 'min-width': '40px' },
            _width: undefined,
            _widthProportion: 1,
            minWidth: 40,
          },
        ];

        expect(result).toEqual(expectedResult);
      });

      it('should call event columnsReordered with parameter', () => {
        const columns = [1, 2, 3];

        const mockedThis = {
          $emit: jest.fn(),
        };

        Header.computed.preparedColumns.set.call(mockedThis, columns);

        expect(mockedThis.$emit).toHaveBeenCalledWith('columnsReordered', columns);
      });
    });

    describe('columnsStyles', () => {
      it('should return empty object if defined preparedColumns as empty', () => {
        const mockedThis = {
          preparedColumns: null,
        };

        const result = Header.computed.columnsStyles.call(mockedThis);

        expect(result).toEqual({});
      });

      it('should return object with columns styles if defined preparedColumns as array', () => {
        const mockedThis = {
          preparedColumns: [
            {
              _className: 'column-column0',
              _style: { flex: 1, 'min-width': '40px' },
            },
          ],
        };

        const result = Header.computed.columnsStyles.call(mockedThis);

        const expectedResult = { 'column-column0': { flex: 1, 'min-width': '40px' } };
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('watch: ', () => {
    describe('columnsWidth', () => {
      it('should call adjustColumnsEllipsis if columnsEllipsisMode equal header cell ellipsis smart', () => {
        const mockedThis = {
          checkResizerPositions: jest.fn(),
          columnsEllipsisMode: HEADER_CELL_ELLIPSIS_SMART,
          adjustColumnsEllipsis: jest.fn(),
        };

        Header.watch.columnsWidth.handler.call(mockedThis);

        expect(mockedThis.checkResizerPositions).toHaveBeenCalled();
        expect(mockedThis.adjustColumnsEllipsis).toHaveBeenCalled();
      });

      it('should not call adjustColumnsEllipsis if columnsEllipsisMode not equal header cell ellipsis smart', () => {
        const mockedThis = {
          checkResizerPositions: jest.fn(),
          columnsEllipsisMode: false,
          adjustColumnsEllipsis: jest.fn(),
        };

        Header.watch.columnsWidth.handler.call(mockedThis);

        expect(mockedThis.checkResizerPositions).toHaveBeenCalled();
        expect(mockedThis.adjustColumnsEllipsis).not.toHaveBeenCalled();
      });
    });

    describe('columnsStyles', () => {
      it('should call compileColumnsStyles and checkResizerPositions', () => {
        const mockedThis = {
          compileColumnsStyles: jest.fn(),
          checkResizerPositions: jest.fn(),
        };

        Header.watch.columnsStyles.handler.call(mockedThis);

        expect(mockedThis.compileColumnsStyles).toHaveBeenCalled();
        expect(mockedThis.checkResizerPositions).toHaveBeenCalled();
      });
    });
  });

  describe('methods: ', () => {
    describe('compileColumnsStyles', () => {
      it('should compile columns styles', () => {
        const appendChild = jest.fn();

        const mockedThis = {
          columnsStyles: {
            'column-id': { flex: '3', 'min-width': '50px' },
            'column-role': { flex: '15', 'min-width': '60px' },
          },
          stylesContainer: null,
          tableNameIdentificator: 'wombat-columns-styles',
        };

        document.querySelector = jest.fn(selector => {
          return selector.includes('#') ? false : { appendChild };
        });

        Header.methods.compileColumnsStyles.call(mockedThis);

        expect(document.querySelector).toHaveBeenCalledWith('body');

        const expectedResult = document.createElement('STYLE');
        expectedResult.id = mockedThis.tableNameIdentificator;
        expectedResult.innerHTML = `.wombat-table .cell.column-id {
            flex: 3;
min-width: 50px;
          }
.wombat-table .cell.column-role {
            flex: 15;
min-width: 60px;
          }`;
        expect(appendChild).toHaveBeenCalledWith(expectedResult);
      });

      it('should compile empty columns styles if styles in columnsStyles not defined', () => {
        const appendChild = jest.fn();

        const mockedThis = {
          columnsStyles: {
            'column-id': null,
          },
          stylesContainer: null,
          tableNameIdentificator: 'wombat-columns-styles',
        };

        document.querySelector = jest.fn(selector => {
          return selector.includes('#') ? false : { appendChild };
        });

        Header.methods.compileColumnsStyles.call(mockedThis);

        expect(document.querySelector).toHaveBeenCalledWith('body');

        const expectedResult = document.createElement('STYLE');
        expectedResult.id = mockedThis.tableNameIdentificator;
        expectedResult.innerHTML = `.wombat-table .cell.column-id {
            
          }`;
        expect(appendChild).toHaveBeenCalledWith(expectedResult);
      });

      it('should not create new style element if defined stylesContainer', () => {
        const mockedThis = {
          columnsStyles: {
            'column-id': null,
          },
          stylesContainer: document.createElement('STYLE'),
          tableNameIdentificator: 'wombat-columns-styles',
        };

        document.querySelector = jest.fn();

        Header.methods.compileColumnsStyles.call(mockedThis);

        expect(document.querySelector).not.toHaveBeenCalledWith('#wombat-columns-styles');

        const expectedResult = document.createElement('STYLE');
        expectedResult.innerHTML = `.wombat-table .cell.column-id {
            
          }`;
        expect(mockedThis.stylesContainer).toEqual(expectedResult);
      });
    });

    describe('checkColumnsWidth', () => {
      it('should set object with column width if columnEl is exists', () => {
        const mockedThis = {
          $nextTick: jest.fn(func => func()),
          preparedColumns: [{ _className: 'test', name: 'test-name' }],
          $el: {
            querySelector: jest.fn(() => ({ clientWidth: '133px' })),
          },
          columnsWidth: null,
        };

        Header.methods.checkColumnsWidth.call(mockedThis);

        const expectedResult = { 'test-name': '133px' };
        expect(mockedThis.columnsWidth).toEqual(expectedResult);
      });

      it('should set empty object if columnEl is not exists', () => {
        const mockedThis = {
          $nextTick: jest.fn(func => func()),
          preparedColumns: [{ _className: 'test', name: 'test-name' }],
          $el: {
            querySelector: jest.fn(() => false),
          },
          columnsWidth: null,
        };

        Header.methods.checkColumnsWidth.call(mockedThis);

        expect(mockedThis.columnsWidth).toEqual({});
      });
    });

    describe('checkResizerPositions', () => {
      it('should set new width for each columns', () => {
        const mockedThis = {
          resizerPositions: null,
          columnsWidth: { company: 217, contributePercentage: 150, googleReviewConversion: 218 },
          $nextTick: jest.fn(func => func()),
        };

        Header.methods.checkResizerPositions.call(mockedThis);

        const expectedResult = {
          company: 212,
          contributePercentage: 145,
          googleReviewConversion: 213,
        };

        expect(mockedThis.resizerPositions).toEqual(expectedResult);
      });
    });

    describe('calculateNewWidth', () => {
      it('should return min width if passed _minWidth more than newWidth', () => {
        const column = { _minWidth: 100 };
        const newWidth = 50;

        const result = Header.methods.calculateNewWidth(column, newWidth);

        expect(result).toEqual(column._minWidth);
      });

      it('should return newWidth if passed newWidth more than _minWidth', () => {
        const column = { _minWidth: 40, _width: 10 };
        const newWidth = 50;

        const result = Header.methods.calculateNewWidth(column, newWidth);

        expect(result).toEqual(newWidth);
      });

      it('should return _width if passed width less than min draggable difference', () => {
        const column = { _minWidth: 5, _width: 9 };
        const newWidth = 5;

        const result = Header.methods.calculateNewWidth(column, newWidth);

        expect(result).toEqual(column._width);
      });
    });

    describe('onResizeFinish', () => {
      it('should call method calculateNewWidth with positive new width if passed column width', () => {
        const column = { _width: 100, name: 'test-name' };
        const newWidth = -50;

        const mockedThis = {
          calculateNewWidth: jest.fn(),
          $emit: jest.fn(),
        };

        Header.methods.onResizeFinish.call(mockedThis, column, newWidth);

        expect(mockedThis.calculateNewWidth).toHaveBeenCalledWith(column, -newWidth);
      });

      it('should call event columnsResized with parameters', () => {
        const column = { _width: 100, name: 'test-name' };
        const newWidth = -50;

        const mockedThis = {
          calculateNewWidth: jest.fn(() => 20),
          $emit: jest.fn(),
        };

        Header.methods.onResizeFinish.call(mockedThis, column, newWidth);

        const expectedResult = { 'test-name': '20px' };
        expect(mockedThis.$emit).toHaveBeenCalledWith('columnsResized', expectedResult);
      });

      it('should call method adjustFluidColumns with parameter', () => {
        const column = { name: 'test-name' };
        const newWidth = 50;

        const mockedThis = {
          $emit: jest.fn(),
          preparedColumns: [
            {
              name: 'id',
              field: 'user.ObjectId',
              fieldType: 'userId',
              class: 'text',
              title: 'users.id',
            },
            {
              name: 'userName',
              field: null,
              fieldType: 'userName',
              class: 'text',
              title: 'users.name',
            },
          ],
          columnsWidth: { userName: 217, id: 67 },
          totalReducer: jest.fn((total, item) => total + item),
          resizerPositions: {},
          adjustFluidColumns: jest.fn(),
        };

        Header.methods.onResizeFinish.call(mockedThis, column, newWidth);

        expect(mockedThis.adjustFluidColumns).toHaveBeenCalledWith(
          284,
          234,
          mockedThis.preparedColumns
        );
      });

      it('should call method adjustFixedColumns with parameter if newFluidColumnsWidth not equal fluidColumnsTotalWidth', () => {
        const column = { name: 'test-name' };
        const newWidth = 550;

        const mockedThis = {
          $emit: jest.fn(),
          preparedColumns: [
            {
              name: 'id',
              field: 'user.ObjectId',
              fieldType: 'userId',
              class: 'text',
              title: 'users.id',
              _width: 120,
            },
            {
              name: 'userName',
              field: null,
              fieldType: 'userName',
              class: 'text',
              title: 'users.name',
              _width: 150,
            },
          ],
          width: 1366,
          columnsWidth: { userName: 217, id: 67 },
          totalReducer: jest.fn((total, item) => total + item),
          resizerPositions: { 'test-name': 87, id: 67 },
          adjustFluidColumns: jest.fn(),
          adjustFixedColumns: jest.fn(),
        };

        Header.methods.onResizeFinish.call(mockedThis, column, newWidth);

        expect(mockedThis.adjustFixedColumns).toHaveBeenCalledWith(816, mockedThis.preparedColumns);
      });

      it('should set newFluidColumnsWidth as _newWidth if _newWidth less resizer positions', () => {
        const column = { name: 'test-name' };
        const newWidth = 10;

        const mockedThis = {
          $emit: jest.fn(),
          preparedColumns: [
            {
              name: 'id',
              field: 'user.ObjectId',
              fieldType: 'userId',
              class: 'text',
              title: 'users.id',
              _width: 120,
            },
            {
              name: 'userName',
              field: null,
              fieldType: 'userName',
              class: 'text',
              title: 'users.name',
              _width: 150,
            },
          ],
          width: 1366,
          columnsWidth: { userName: 217, id: 67 },
          totalReducer: jest.fn((total, item) => total + item),
          resizerPositions: { 'test-name': 87, id: 67 },
          adjustFluidColumns: jest.fn(),
          adjustFixedColumns: jest.fn(),
        };

        Header.methods.onResizeFinish.call(mockedThis, column, newWidth);

        expect(mockedThis.adjustFluidColumns).toHaveBeenCalledWith(10, 0, []);
      });

      it('should set newFluidColumnsWidth if array otherFluidColumns is not empty', () => {
        const column = { name: 'test-name' };
        const newWidth = 10;

        const columnUser = [
          {
            class: 'text',
            field: 'user.ObjectId',
            fieldType: 'userId',
            minWidth: 50,
            name: 'id',
            title: 'users.id',
          },
        ];

        const mockedThis = {
          $emit: jest.fn(),
          preparedColumns: [
            ...columnUser,
            {
              name: 'test-name',
              field: null,
              fieldType: 'userName',
              class: 'text',
              title: 'users.name',
            },
          ],
          width: 1366,
          columnsWidth: { 'test-name': 217, id: 67 },
          totalReducer: jest.fn((total, item) => total + item),
          resizerPositions: { 'test-name': 87, id: 67 },
          adjustFluidColumns: jest.fn(),
          adjustFixedColumns: jest.fn(),
        };

        Header.methods.onResizeFinish.call(mockedThis, column, newWidth);

        expect(mockedThis.adjustFluidColumns).toHaveBeenCalledWith(244, 234, columnUser);
      });
    });

    describe('adjustFluidColumns', () => {
      it('should return object with adjust width for fluid columns', () => {
        const totalWidth = 1220;
        const widthToAdjust = 1082;
        const columns = [
          { _widthProportion: 3, name: 'age' },
          { _widthProportion: 15, name: 'userName' },
        ];

        const mockedThis = {
          totalReducer: jest.fn((total, item) => total + item),
        };

        const result = Header.methods.adjustFluidColumns.call(
          mockedThis,
          totalWidth,
          widthToAdjust,
          columns
        );

        const expectedResult = { age: 15, userName: 74 };
        expect(result).toEqual(expectedResult);
      });
    });

    describe('adjustFixedColumns', () => {
      it('should return object with adjust width for fixed columns', () => {
        const widthToAdjust = 1082;
        const columns = [
          { _width: 30, name: 'age', _minWidth: 15 },
          { _width: 150, name: 'userName', _minWidth: 50 },
        ];

        const mockedThis = {
          totalReducer: jest.fn((total, item) => total + item),
        };

        const result = Header.methods.adjustFixedColumns.call(mockedThis, widthToAdjust, columns);

        const expectedResult = { age: '180px', userName: '902px' };
        expect(result).toEqual(expectedResult);
      });
    });

    describe('totalReducer', () => {
      it('should return sum of two arguments if passed two arguments', () => {
        const total = 10;
        const item = 20;

        const result = Header.methods.totalReducer(total, item);

        expect(result).toEqual(total + item);
      });
    });

    describe('adjustColumnsEllipsis', () => {
      it('should call method remove', () => {
        const classList = { remove: jest.fn() };

        const mockedThis = {
          preparedColumns: [{ _machineName: 'test-age' }],
          $refs: {
            'test-age': [
              {
                classList,
                clientWidth: 20,
                scrollWidth: 5,
              },
            ],
          },
        };

        Header.methods.adjustColumnsEllipsis.call(mockedThis);

        expect(classList.remove).toHaveBeenCalledWith('header-column-ellipsis');
      });

      it('should call method add', () => {
        const classList = { remove: jest.fn(), add: jest.fn() };

        const mockedThis = {
          preparedColumns: [{ _machineName: 'test-age' }],
          $refs: {
            'test-age': [
              {
                classList,
                clientWidth: 10,
                scrollWidth: 20,
              },
            ],
          },
        };

        Header.methods.adjustColumnsEllipsis.call(mockedThis);

        expect(classList.add).toHaveBeenCalledWith('header-column-ellipsis');
      });
    });

    describe('preventColumnDragging', () => {
      it('should call preventDefault and stopPropagation', () => {
        const ev = {
          preventDefault: jest.fn(),
          stopPropagation: jest.fn(),
        };

        Header.methods.preventColumnDragging(ev);

        expect(ev.preventDefault).toHaveBeenCalled();
        expect(ev.stopPropagation).toHaveBeenCalled();
      });
    });
  });

  describe('mounted', () => {
    it('should call method checkColumnsWidth', () => {
      const mockedThis = {
        checkColumnsWidth: jest.fn(),
        compileColumnsStyles: jest.fn(),
      };

      window.addEventListener = jest.fn();

      Header.mounted.call(mockedThis);

      expect(mockedThis.checkColumnsWidth).toHaveBeenCalled();
    });

    it('should call method compileColumnsStyles', () => {
      const mockedThis = {
        checkColumnsWidth: jest.fn(),
        compileColumnsStyles: jest.fn(),
      };

      window.addEventListener = jest.fn();

      Header.mounted.call(mockedThis);

      expect(mockedThis.compileColumnsStyles).toHaveBeenCalled();
    });

    it('should call event resize with parameter', () => {
      const mockedThis = {
        checkColumnsWidth: jest.fn(),
        compileColumnsStyles: jest.fn(),
      };

      window.addEventListener = jest.fn();

      Header.mounted.call(mockedThis);

      expect(window.addEventListener).toHaveBeenCalledWith('resize', mockedThis.checkColumnsWidth);
    });
  });

  describe('beforeDestroy', () => {
    it('should call method querySelector', () => {
      const remove = jest.fn();

      const mockedThis = {
        tableNameIdentificator: 'test',
      };

      document.querySelector = jest.fn(() => ({
        remove,
      }));

      Header.beforeDestroy.call(mockedThis);

      expect(document.querySelector).toHaveBeenCalledWith(`#${mockedThis.tableNameIdentificator}`);
    });

    it('should call method remove', () => {
      const remove = jest.fn();

      const mockedThis = {
        tableNameIdentificator: 'test',
      };

      document.querySelector = jest.fn(() => ({
        remove,
      }));

      Header.beforeDestroy.call(mockedThis);

      expect(remove).toHaveBeenCalled();
    });
  });
});
