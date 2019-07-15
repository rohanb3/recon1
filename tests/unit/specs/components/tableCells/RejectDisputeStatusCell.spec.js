import RejectDisputeStatusCell from '@/components/tableCells/RejectDisputeStatusCell';
import { DISPUTE_STATUSES_ID } from '@/constants';

describe('RejectDisputeStatusCell: ', () => {
  describe('computed: ', () => {
    describe('rejectDate: ', () => {
      it('should return reject date if defined timeStamp', () => {
        const timeStamp = '2019';

        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({ timeStamp })),
        };

        const result = RejectDisputeStatusCell.computed.rejectDate.call(mockedThis);

        expect(result).toEqual(timeStamp);
      });

      it('should return empty string if not defined timeStamp', () => {
        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({})),
        };

        const result = RejectDisputeStatusCell.computed.rejectDate.call(mockedThis);

        expect(result).toEqual('');
      });
    });

    describe('isContainsRejectedStatus: ', () => {
      it('should call isContainsStatusInHistory with parameter', () => {
        const mockedThis = {
          isContainsStatusInHistory: jest.fn(),
        };

        RejectDisputeStatusCell.computed.isContainsRejectedStatus.call(mockedThis);

        expect(mockedThis.isContainsStatusInHistory).toHaveBeenCalledWith(
          DISPUTE_STATUSES_ID.REJECTED
        );
      });
    });
  });

  describe('methods: ', () => {
    describe('onResubmit: ', () => {
      it('should call event confirmRejectDisputeStatus parameter', () => {
        const id = 7;
        const mockedThis = {
          $emit: jest.fn(),
          item: { id },
        };

        RejectDisputeStatusCell.methods.onResubmit.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('confirmRejectDisputeStatus', {
          disputeId: id,
          statusId: DISPUTE_STATUSES_ID.REJECTED,
        });
      });
    });
  });
});
