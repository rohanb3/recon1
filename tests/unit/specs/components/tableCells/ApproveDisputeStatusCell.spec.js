import ApproveDisputeStatusCell from '@/components/tableCells/ApproveDisputeStatusCell';
import { DISPUTE_STATUSES_ID } from '@/constants';

describe('ApproveDisputeStatusCell: ', () => {
  describe('computed: ', () => {
    describe('approveDate: ', () => {
      it('should call getLastDisputeStatus with parameter', () => {
        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({ timeStamp: 132 })),
        };

        ApproveDisputeStatusCell.computed.approveDate.call(mockedThis);

        expect(mockedThis.getLastDisputeStatus).toHaveBeenCalledWith(
          DISPUTE_STATUSES_ID.CONFIRM_APPROVED
        );
      });

      it('should return date time', () => {
        const timeStamp = '2019-06-01T12:00';

        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({ timeStamp })),
        };

        const result = ApproveDisputeStatusCell.computed.approveDate.call(mockedThis);

        expect(result).toEqual(timeStamp);
      });

      it('should return empty string if timeStamp not defined', () => {
        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({})),
        };

        const result = ApproveDisputeStatusCell.computed.approveDate.call(mockedThis);

        expect(result).toEqual('');
      });
    });

    describe('isContainsApprovedStatus: ', () => {
      it('should call isContainsStatusInHistory with parameter', () => {
        const mockedThis = {
          isContainsStatusInHistory: jest.fn(),
        };

        ApproveDisputeStatusCell.computed.isContainsApprovedStatus.call(mockedThis);

        expect(mockedThis.isContainsStatusInHistory).toHaveBeenCalledWith(
          DISPUTE_STATUSES_ID.CONFIRM_APPROVED
        );
      });
    });
  });

  describe('methods: ', () => {
    describe('onResubmit: ', () => {
      it('should call event confirmApproveDisputeStatus with two parameters', () => {
        const mockedThis = {
          $emit: jest.fn(),
          item: {
            id: 7,
          },
        };

        ApproveDisputeStatusCell.methods.onResubmit.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('confirmApproveDisputeStatus', {
          disputeId: 7,
          statusId: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
        });
      });
    });
  });
});
