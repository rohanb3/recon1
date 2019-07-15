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

        const result = DisputeHistory.computed.filters.call(mockedThis);

        expect(result).toEqual('qwerty');
      });
    });
  });
});
