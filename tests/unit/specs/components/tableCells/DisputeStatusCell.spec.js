import DisputeStatusCell from '@/components/tableCells/DisputeStatusCell';
import { DISPUTE_STATUSES_ID } from '@/constants';

describe('DisputeStatusCell: ', () => {
  describe('computed: ', () => {
    describe('disputeStatus: ', () => {
      it('should return object with dispute status', () => {
        const status = {
          status: 132,
        };

        const mockedThis = {
          item: {
            status,
          },
        };

        const result = DisputeStatusCell.computed.disputeStatus.call(mockedThis);

        expect(result).toEqual(status);
      });

      it('should return empty object if not defined disputeStatus', () => {
        const mockedThis = {
          item: {},
        };

        const result = DisputeStatusCell.computed.disputeStatus.call(mockedThis);

        expect(result).toEqual({});
      });
    });

    describe('status: ', () => {
      it('should return approved status name if status id confrim approved', () => {
        const mockedThis = {
          disputeStatus: {
            id: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
          },
        };

        const result = DisputeStatusCell.computed.status.call(mockedThis);

        expect(result).toEqual('approved');
      });

      it('should return rejected status name if status resent', () => {
        const mockedThis = {
          disputeStatus: {
            id: DISPUTE_STATUSES_ID.RE_SENT,
          },
        };

        const result = DisputeStatusCell.computed.status.call(mockedThis);

        expect(result).toEqual('rejected');
      });

      it('should return rejected status name if status rejected', () => {
        const mockedThis = {
          disputeStatus: {
            id: DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          },
        };

        const result = DisputeStatusCell.computed.status.call(mockedThis);

        expect(result).toEqual('rejected');
      });

      it('should return new status name if status sent', () => {
        const mockedThis = {
          disputeStatus: {
            id: DISPUTE_STATUSES_ID.SENT,
          },
        };

        const result = DisputeStatusCell.computed.status.call(mockedThis);

        expect(result).toEqual('new');
      });

      it('should return new status name if status sent', () => {
        const name = 'qwerty';
        const mockedThis = {
          disputeStatus: {
            id: 132,
            name,
          },
        };

        const result = DisputeStatusCell.computed.status.call(mockedThis);

        expect(result).toEqual(name);
      });
    });
  });
});
