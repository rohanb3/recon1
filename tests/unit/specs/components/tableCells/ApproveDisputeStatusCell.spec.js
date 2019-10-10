import ApproveDisputeStatusCell from '@/components/tableCells/ApproveDisputeStatusCell';
import { DISPUTE_STATUSES_ID } from '@/constants';

describe('ApproveDisputeStatusCell: ', () => {
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
          id: 7,
          statusId: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
        });
      });
    });
  });
});
