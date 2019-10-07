import ResubmitCell from '@/components/tableCells/ResubmitCell';
import { DISPUTE_STATUSES_ID } from '@/constants';

describe('ResubmitCell: ', () => {
  describe('computed: ', () => {
    describe('isSentOrResentStatus: ', () => {
      it('should return true if defined sent status', () => {
        const mockedThis = {
          isSentStatus: true,
        };

        const result = ResubmitCell.computed.isSentOrResentStatus.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return true if defined resent status', () => {
        const mockedThis = {
          isResentStatus: true,
        };

        const result = ResubmitCell.computed.isSentOrResentStatus.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if not defined sent and resent status', () => {
        const result = ResubmitCell.computed.isSentOrResentStatus();

        expect(result).toBeFalsy();
      });
    });

    describe('rejectDate: ', () => {
      it('should return resubmit date if defined timeStamp', () => {
        const timeStamp = '2019';

        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({ timeStamp })),
        };

        const result = ResubmitCell.computed.resubmitDate.call(mockedThis);

        expect(result).toEqual(timeStamp);
      });

      it('should return empty string if not defined timeStamp', () => {
        const mockedThis = {
          getLastDisputeStatus: jest.fn(() => ({})),
        };

        const result = ResubmitCell.computed.resubmitDate.call(mockedThis);

        expect(result).toEqual('');
      });
    });

    describe('isContainsInprogressStatus: ', () => {
      it('should call isContainsStatusInHistory with parameter', () => {
        const mockedThis = {
          isContainsStatusInHistory: jest.fn(),
        };

        ResubmitCell.computed.isContainsInprogressStatus.call(mockedThis);

        expect(mockedThis.isContainsStatusInHistory).toHaveBeenCalledWith(
          DISPUTE_STATUSES_ID.IN_PROGRESS
        );
      });
    });
  });

  describe('methods: ', () => {
    describe('onResubmit: ', () => {
      it('should call event changeDisputeStatus parameter', () => {
        const id = 7;
        const mockedThis = {
          $emit: jest.fn(),
          item: { id },
        };

        ResubmitCell.methods.onResubmit.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('changeDisputeStatus', {
          id,
          statusId: DISPUTE_STATUSES_ID.IN_PROGRESS,
        });
      });
    });
  });
});
