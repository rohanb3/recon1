import DisputeHistory from '@/containers/DisputeHistory';
import * as background from '@/services/background';
import { FILTER_NAMES } from '@/constants';

describe('DisputeHistory', () => {
  describe('mounted', () => {
    it('should call addBackgroundShadow', () => {
      background.addBackgroundShadow = jest.fn();

      DisputeHistory.mounted();

      expect(background.addBackgroundShadow).toHaveBeenCalled();
    });
  });

  describe('destroyed', () => {
    it('should call removeBackgroundShadow', () => {
      background.removeBackgroundShadow = jest.fn();

      DisputeHistory.destroyed();

      expect(background.removeBackgroundShadow).toHaveBeenCalled();
    });
  });

  describe('computed', () => {
    describe('tableData', () => {
      it('should return object with data if defined table', () => {
        const company = { id: 7 };
        const mockedThis = {
          $store: {
            state: {
              tables: {
                company,
              },
            },
          },
          tableName: 'company',
        };

        const result = DisputeHistory.computed.tableData.call(mockedThis);

        expect(result).toEqual(company);
      });

      it('should return empty object if not defined table', () => {
        const mockedThis = {
          $store: {
            state: {
              tables: {},
            },
          },
          tableName: 'company',
        };

        const result = DisputeHistory.computed.tableData.call(mockedThis);

        expect(result).toEqual({});
      });
    });

    describe('filters', () => {
      it('should return object with data if defined filters', () => {
        const company = { id: 7 };
        const mockedThis = {
          tableData: {
            filters: {
              company,
            },
          },
        };

        const result = DisputeHistory.computed.filters.call(mockedThis);

        expect(result).toEqual({ company });
      });

      it('should return empty object if not defined filters', () => {
        const mockedThis = {
          tableData: {},
        };

        const result = DisputeHistory.computed.filters.call(mockedThis);

        expect(result).toEqual({});
      });
    });

    describe('disputeId', () => {
      it('should return value of filter by dispute id if defined filters', () => {
        const mockedThis = {
          filters: {
            [FILTER_NAMES.DISPUTE_ID]: 'qwerty',
          },
        };

        const result = DisputeHistory.computed.disputeId.call(mockedThis);

        expect(result).toEqual('qwerty');
      });
    });

    describe('selected', () => {
      it('should call method getItemById', () => {
        const mockedThis = {
          $store: {
            getters: {
              getItemById: jest.fn(),
            },
          },
          disputeId: 7,
          parentTableName: 'company',
        };

        DisputeHistory.computed.selected.call(mockedThis);

        expect(mockedThis.$store.getters.getItemById).toHaveBeenCalledWith(
          mockedThis.disputeId,
          mockedThis.parentTableName,
          expect.any(Function)
        );
      });

      it('should return object with data', () => {
        const mockedThis = {
          $store: {
            getters: {
              getItemById: jest.fn(() => ({
                id: 123,
              })),
            },
          },
          disputeId: 7,
          parentTableName: 'company',
        };

        const result = DisputeHistory.computed.selected.call(mockedThis);

        expect(result).toEqual({
          id: 123,
        });
      });

      it('should return empty object if method getItemById returned empty object', () => {
        const mockedThis = {
          $store: {
            getters: {
              getItemById: jest.fn(() => {}),
            },
          },
          disputeId: 7,
          parentTableName: 'company',
        };

        const result = DisputeHistory.computed.selected.call(mockedThis);

        expect(result).toEqual({});
      });
    });

    describe('orderId', () => {
      it('should return order number', () => {
        const orderNumber = 789;
        const mockedThis = {
          selected: {
            orderNumber,
          },
        };

        const result = DisputeHistory.computed.orderId.call(mockedThis);

        expect(result).toEqual(orderNumber);
      });
    });
  });

  describe('methods', () => {
    describe('close', () => {
      it('should call event close', () => {
        const mockedThis = {
          $emit: jest.fn(),
        };

        DisputeHistory.methods.close.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('close');
      });
    });
  });
});
