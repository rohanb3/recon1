import RejectDisputeStatusCell from '@/components/tableCells/RejectDisputeStatusCell';
import { DISPUTE_STATUSES_ID } from '@/constants';

describe('RejectDisputeStatusCell: ', () => {
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
          id,
          statusId: DISPUTE_STATUSES_ID.REJECTED,
        });
      });
    });
  });
});
