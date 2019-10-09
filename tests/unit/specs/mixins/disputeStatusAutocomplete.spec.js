import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';

describe('disputeStatusAutocomplete', () => {
  describe('disputeStatusAutocomplete: computed', () => {
    describe('disputeId', () => {
      it('should return id', () => {
        const mockedThis = {
          item: {
            id: 7,
          },
        };

        const id = disputeStatusAutocomplete.computed.disputeId.call(mockedThis);

        const expectedId = 7;

        expect(id).toEqual(expectedId);
      });
    });
    describe('disputeStatusId', () => {
      it('should return id', () => {
        const mockedThis = {
          item: {
            status: {
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

    describe('isStatusEditableBySAM', () => {
      it('should return true if status editable by sam', () => {
        const mockedThis = {
          scopes: ['scope1', 'scope2'],
        };

        const result = disputeStatusAutocomplete.computed.isStatusEditableBySAM.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isStatusNotEditableOrStatusProcessing', () => {
      it('should return true if defined isStatusEditableBySAM as true', () => {
        const mockedThis = {
          isStatusEditableBySAM: true,
        };

        const result = disputeStatusAutocomplete.computed.isStatusNotEditableOrStatusProcessing.call(
          mockedThis
        );

        expect(result).toBeTruthy();
      });

      it('should return true if defined statusProcessing as true', () => {
        const mockedThis = {
          statusProcessing: true,
        };

        const result = disputeStatusAutocomplete.computed.isStatusNotEditableOrStatusProcessing.call(
          mockedThis
        );

        expect(result).toBeTruthy();
      });
    });

    describe('statusProcessing', () => {
      it('should return true if disputeId is contained in the array processingIds', () => {
        const mockedThis = {
          disputeId: 123,
          processingIds: [123, 312],
        };

        const result = disputeStatusAutocomplete.computed.statusProcessing.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if disputeId is not contained in the array processingIds', () => {
        const mockedThis = {
          disputeId: 7,
          processingIds: [123, 312],
        };

        const result = disputeStatusAutocomplete.computed.statusProcessing.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });
  });
});
