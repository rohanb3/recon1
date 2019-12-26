import Table from '@/components/WombatTable/Table';

jest.mock('perfect-scrollbar');

describe('WombatTable:Table: ', () => {
  describe('computed: ', () => {
    describe('rowCellStotPresent', () => {
      it('should return true if defined only scoped slots', () => {
        const mockedThis = {
          $scopedSlots: {
            'row-cell': 10,
          },
          $slots: {},
        };

        const result = Table.computed.rowCellStotPresent.call(mockedThis);
        expect(result).toBeTruthy();
      });

      it('should return true if defined only slots', () => {
        const mockedThis = {
          $scopedSlots: {},
          $slots: {
            'row-cell': 10,
          },
        };

        const result = Table.computed.rowCellStotPresent.call(mockedThis);
        expect(result).toBeTruthy();
      });
    });

    describe('headerCellStotPresent', () => {
      it('should return true if defined only scoped slots', () => {
        const mockedThis = {
          $scopedSlots: {
            'header-cell': 10,
          },
          $slots: {},
        };

        const result = Table.computed.headerCellStotPresent.call(mockedThis);
        expect(result).toBeTruthy();
      });

      it('should return true if defined only slots', () => {
        const mockedThis = {
          $scopedSlots: {},
          $slots: {
            'header-cell': 10,
          },
        };

        const result = Table.computed.headerCellStotPresent.call(mockedThis);
        expect(result).toBeTruthy();
      });
    });

    describe('footerCellStotPresent', () => {
      it('should return true if defined only scoped slots', () => {
        const mockedThis = {
          $scopedSlots: {
            'footer-cell': 10,
          },
          $slots: {},
        };

        const result = Table.computed.footerCellStotPresent.call(mockedThis);
        expect(result).toBeTruthy();
      });

      it('should return true if defined only slots', () => {
        const mockedThis = {
          $scopedSlots: {},
          $slots: {
            'footer-cell': 10,
          },
        };

        const result = Table.computed.footerCellStotPresent.call(mockedThis);
        expect(result).toBeTruthy();
      });
    });

    describe('itemsLength', () => {
      it('should return length', () => {
        const mockedThis = {
          items: [1, 2, 3],
        };

        const result = Table.computed.itemsLength.call(mockedThis);
        expect(result).toEqual(3);
      });
    });

    describe('scrollbarShown', () => {
      it('should return length if array of items is not empty', () => {
        const mockedThis = {
          items: [1, 2, 3],
        };

        const result = Table.computed.scrollbarShown.call(mockedThis);
        expect(result).toEqual(3);
      });

      it('should return true if array of items is empty', () => {
        const mockedThis = {
          items: [],
          infiniteLoading: true,
        };

        const result = Table.computed.scrollbarShown.call(mockedThis);
        expect(result).toBeTruthy();
      });
    });
  });

  describe('methods: ', () => {
    describe('updateScrollBar', () => {
      it('should call update if defined scrollbar', () => {
        const mockedThis = {
          $nextTick: jest.fn(func => func()),
          scrollbar: {
            update: jest.fn(),
          },
        };

        Table.methods.updateScrollBar.call(mockedThis);

        expect(mockedThis.scrollbar.update).toHaveBeenCalled();
      });

      it('should initial scrollbar if scrollbar not defined', () => {
        const el = {
          addEventListener: jest.fn(),
        };

        const mockedThis = {
          $nextTick: jest.fn(func => func()),
          scrollbar: null,
          loadingItems: false,
          $emit: jest.fn(),
        };

        document.querySelector = jest.fn(() => el);

        Table.methods.updateScrollBar.call(mockedThis);

        expect(mockedThis.scrollbar).not.toBeNull();
      });

      it('should call event bottomReached if defined loadingItems as false', () => {
        const el = {
          addEventListener: jest.fn((type, func) => func()),
        };

        const mockedThis = {
          $nextTick: jest.fn(func => func()),
          scrollbar: null,
          loadingItems: false,
          $emit: jest.fn(),
        };

        document.querySelector = jest.fn(() => el);

        Table.methods.updateScrollBar.call(mockedThis);
        expect(el.addEventListener).toHaveBeenCalledWith('ps-y-reach-end', expect.any(Function));
        expect(mockedThis.$emit).toHaveBeenCalledWith('bottomReached');
      });

      it('should not call event bottomReached if defined loadingItems as true', () => {
        const el = {
          addEventListener: jest.fn((type, func) => func()),
        };

        const mockedThis = {
          $nextTick: jest.fn(func => func()),
          scrollbar: null,
          loadingItems: true,
          $emit: jest.fn(),
        };

        document.querySelector = jest.fn(() => el);

        Table.methods.updateScrollBar.call(mockedThis);
        expect(el.addEventListener).toHaveBeenCalledWith('ps-y-reach-end', expect.any(Function));
        expect(mockedThis.$emit).not.toHaveBeenCalledWith('bottomReached');
      });
    });

    describe('scrollToFirstInsertedtem', () => {
      it('should call scrollToPosition with parameter', () => {
        const mockedThis = {
          lastScrollTop: 10,
          lastScrollHeight: 15,
          itemHeight: 7,
          scrollToPosition: jest.fn(),
        };

        Table.methods.scrollToFirstInsertedtem.call(mockedThis);

        const expectedParameter = 18;
        expect(mockedThis.scrollToPosition).toHaveBeenCalledWith(expectedParameter);
      });
    });

    describe('scrollToPrependedItem', () => {
      it('should call scrollToPosition with parameter', () => {
        const mockedThis = {
          scrollToPosition: jest.fn(),
        };

        Table.methods.scrollToPrependedItem.call(mockedThis);

        expect(mockedThis.scrollToPosition).toHaveBeenCalledWith(0);
      });
    });

    describe('infiniteHandler', () => {
      it('should set lastScrollTop and lastScrollHeight', () => {
        const mockedThis = {
          $refs: {
            scroller: {
              $el: {
                scrollTop: 10,
                clientHeight: 960,
              },
            },
          },
          lastScrollTop: null,
          lastScrollHeight: null,
        };

        Table.methods.infiniteHandler.call(mockedThis);

        expect(mockedThis.lastScrollTop).toEqual(10);
        expect(mockedThis.lastScrollHeight).toEqual(960);
      });
    });

    describe('scrollToPosition', () => {
      it('should set scroll position', () => {
        const scrollPosition = 7;

        const mockedThis = {
          $refs: {
            scroller: {
              $el: { scrollTop: null },
            },
          },
        };

        Table.methods.scrollToPosition.call(mockedThis, scrollPosition);

        expect(mockedThis.$refs.scroller.$el.scrollTop).toEqual(scrollPosition);
      });
    });
  });

  describe('watch: ', () => {
    describe('items', () => {
      it('should call method scrollToPrependedItem if defined scrollOnItemsAdding and itemsPrepended as true', () => {
        const next = [{ id: 5 }, { id: 1 }, { id: 2 }];
        const old = [{ id: 1 }, { id: 2 }];

        const mockedThis = {
          itemKeyName: 'id',
          scrollOnItemsAdding: true,
          $nextTick: jest.fn(),
          scrollToPrependedItem: jest.fn(),
          updateScrollBar: jest.fn(),
        };

        Table.watch.items.call(mockedThis, next, old);

        expect(mockedThis.$nextTick).toHaveBeenCalledWith(mockedThis.scrollToPrependedItem);
      });

      it('should call method scrollToFirstInsertedtem if defined scrollOnItemsAdding and itemsAppended as true', () => {
        const next = [{ id: 1 }, { id: 2 }, { id: 5 }];
        const old = [{ id: 1 }, { id: 2 }];

        const mockedThis = {
          itemKeyName: 'id',
          scrollOnItemsAdding: true,
          $nextTick: jest.fn(),
          scrollToPrependedItem: jest.fn(),
          updateScrollBar: jest.fn(),
          scrollToFirstInsertedtem: jest.fn(),
        };

        window.setTimeout = jest.fn(func => func());

        Table.watch.items.call(mockedThis, next, old);

        expect(mockedThis.scrollToFirstInsertedtem).toHaveBeenCalled();
      });

      it('should call method updateScrollBar', () => {
        const next = [{ id: 1 }, { id: 2 }];
        const old = [{ id: 1 }, { id: 2 }];

        const mockedThis = {
          itemKeyName: 'id',
          scrollOnItemsAdding: true,
          updateScrollBar: jest.fn(),
        };

        Table.watch.items.call(mockedThis, next, old);

        expect(mockedThis.updateScrollBar).toHaveBeenCalled();
      });
    });
  });

  describe('mounted: ', () => {
    it('should call method updateScrollBar', () => {
      const mockedThis = {
        updateScrollBar: jest.fn(),
      };

      Table.mounted.call(mockedThis);

      expect(mockedThis.updateScrollBar).toHaveBeenCalled();
    });
  });
});
