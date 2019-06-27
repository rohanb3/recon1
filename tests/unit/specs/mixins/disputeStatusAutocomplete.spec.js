import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';

describe('disputeStatusAutocomplete', () => {
  describe('disputeStatusAutocomplete: computed', () => {
    describe('disputeStatusId', () => {
      it('should return id', () => {
        const mockedThis = {
          item: {
            disputeStatus: {
              id: 1,
            },
          },
        };

        const id = disputeStatusAutocomplete.computed.disputeStatusId.call(mockedThis);

        const expectedId = 1;

        expect(id).toEqual(expectedId);
      });
    });
    describe('isSentStatus', () => {
      it('should check sent status', () => {
        const mockedThis = {
          disputeStatusId: 'd0aa7b12-4b6a-40a2-9032-9ee04e4bf32d',
        };

        const isSent = disputeStatusAutocomplete.computed.isSentStatus.call(mockedThis);

        expect(isSent).toEqual(true);
      });
    });
    describe('isResentStatus', () => {
      it('should check re-sent status', () => {
        const mockedThis = {
          disputeStatusId: '64592b25-cd4e-4cc5-973b-38ca6845066b',
        };

        const isReSent = disputeStatusAutocomplete.computed.isResentStatus.call(mockedThis);

        expect(isReSent).toEqual(true);
      });
    });
    describe('isInprogressStatus', () => {
      it('should check in progress status', () => {
        const mockedThis = {
          disputeStatusId: '82404a5d-966c-4ca9-b714-a039a8176b07',
        };

        const isInProgress = disputeStatusAutocomplete.computed.isInprogressStatus.call(mockedThis);

        expect(isInProgress).toEqual(true);
      });
    });
    describe('disputeStatusHistoryList', () => {
      it('should return disputeStatusHistoryList', () => {
        const mockedThis = {
          item: {
            disputeStatusHistory: [],
          },
        };

        const history = disputeStatusAutocomplete.computed.disputeStatusHistoryList.call(
          mockedThis
        );
        const expectedResult = [];

        expect(history).toEqual(expectedResult);
      });
    });
    describe('isConfirmApprovedStatus', () => {
      it('should check confirm approved status', () => {
        const mockedThis = {
          disputeStatusId: '2a4b15f3-9ed3-4bc7-9788-fedbd3404f14',
        };

        const isConfirmApproved = disputeStatusAutocomplete.computed.isConfirmApprovedStatus.call(
          mockedThis
        );

        expect(isConfirmApproved).toEqual(true);
      });
    });
    describe('isConfirmRejectedStatus', () => {
      it('should check confirm rejected status', () => {
        const mockedThis = {
          disputeStatusId: '8f1bd01e-a153-41e7-b05f-fe3bce68ac26',
        };

        const isConfirmRejected = disputeStatusAutocomplete.computed.isConfirmRejectedStatus.call(
          mockedThis
        );

        expect(isConfirmRejected).toEqual(true);
      });
    });
  });
});
