import RecievedComissonCell from '@/components/tableCells/RecievedComissonCell';

describe('RecievedComissonCell: ', () => {
  describe('computed: ', () => {
    describe('expectedCommission: ', () => {
      it('should return expected commission if defined expectedCommission', () => {
        const mockedThis = {
          item: {
            expectedCommission: '6.75l',
          },
        };

        const result = RecievedComissonCell.computed.expectedCommission.call(mockedThis);

        expect(result).toEqual(6.75);
      });

      it('should return zero if not defined expectedCommission', () => {
        const mockedThis = {
          item: {},
        };

        const result = RecievedComissonCell.computed.expectedCommission.call(mockedThis);

        expect(result).toEqual(0);
      });
    });

    describe('receivedCommission: ', () => {
      it('should return received commission if defined receivedCommission', () => {
        const mockedThis = {
          item: {
            receivedCommission: '6.75l',
          },
        };

        const result = RecievedComissonCell.computed.receivedCommission.call(mockedThis);

        expect(result).toEqual(6.75);
      });

      it('should return zero if not defined receivedCommission', () => {
        const mockedThis = {
          item: {},
        };

        const result = RecievedComissonCell.computed.receivedCommission.call(mockedThis);

        expect(result).toEqual(0);
      });
    });

    describe('isShortageComission: ', () => {
      it('should return true if expected commission more received commission', () => {
        const mockedThis = {
          expectedCommission: 10,
          receivedCommission: 5,
        };

        const result = RecievedComissonCell.computed.isShortageComission.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if expected commission less than received commission', () => {
        const mockedThis = {
          expectedCommission: 5,
          receivedCommission: 15,
        };

        const result = RecievedComissonCell.computed.isShortageComission.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isCommissionPaid: ', () => {
      it('should return true if expectedCommission and receivedCommission is equal', () => {
        const mockedThis = {
          expectedCommission: 10,
          receivedCommission: 10,
        };

        const result = RecievedComissonCell.computed.isCommissionPaid.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if expectedCommission and receivedCommission is not equal', () => {
        const mockedThis = {
          expectedCommission: 5,
          receivedCommission: 15,
        };

        const result = RecievedComissonCell.computed.isCommissionPaid.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isCommissionOverpaid: ', () => {
      it('should return true if receivedCommission more than expectedCommission', () => {
        const mockedThis = {
          expectedCommission: 10,
          receivedCommission: 20,
        };

        const result = RecievedComissonCell.computed.isCommissionOverpaid.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if receivedCommission less than expectedCommission', () => {
        const mockedThis = {
          expectedCommission: 50,
          receivedCommission: 15,
        };

        const result = RecievedComissonCell.computed.isCommissionOverpaid.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });
  });
});
