import DifferenceComissonCell from '@/components/tableCells/DifferenceComissonCell';

describe('DifferenceComissonCell: ', () => {
  describe('computed: ', () => {
    describe('expectedCommission: ', () => {
      it('should return expected commission if defined expectedCommission', () => {
        const mockedThis = {
          item: {
            expectedCommission: '2.75h',
          },
        };

        const result = DifferenceComissonCell.computed.expectedCommission.call(mockedThis);

        expect(result).toEqual(2.75);
      });

      it('should return zero if not defined expectedCommission', () => {
        const mockedThis = {
          item: {},
        };

        const result = DifferenceComissonCell.computed.expectedCommission.call(mockedThis);

        expect(result).toEqual(0);
      });
    });

    describe('receivedCommission: ', () => {
      it('should return received commission if defined receivedCommission', () => {
        const mockedThis = {
          item: {
            receivedCommission: '2.75h',
          },
        };

        const result = DifferenceComissonCell.computed.receivedCommission.call(mockedThis);

        expect(result).toEqual(2.75);
      });

      it('should return zero if not defined receivedCommission', () => {
        const mockedThis = {
          item: {},
        };

        const result = DifferenceComissonCell.computed.receivedCommission.call(mockedThis);

        expect(result).toEqual(0);
      });
    });

    describe('unsignedDifferenceComission: ', () => {
      it('should return unsigned difference comission if defined differenceComission', () => {
        const mockedThis = {
          differenceComission: -20,
        };

        const result = DifferenceComissonCell.computed.unsignedDifferenceComission.call(mockedThis);

        expect(result).toEqual(20);
      });
    });

    describe('differenceComission: ', () => {
      it('should return difference comission if defined expectedCommission and receivedCommission', () => {
        const mockedThis = {
          item: {
            expectedCommission: 50,
            receivedCommission: 40,
            difference: 10,
          },
        };

        const result = DifferenceComissonCell.computed.differenceComission.call(mockedThis);

        expect(result).toEqual(10);
      });
    });

    describe('isPositiveDifference: ', () => {
      it('should return true if defined differenceComission more than zero', () => {
        const mockedThis = {
          differenceComission: 10,
        };

        const result = DifferenceComissonCell.computed.isPositiveDifference.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if defined differenceComission less than or equal to zero', () => {
        const mockedThis = {
          differenceComission: 0,
        };

        const result = DifferenceComissonCell.computed.isPositiveDifference.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isEqualZeroDifference: ', () => {
      it('should return true if defined differenceComission equal to zero', () => {
        const mockedThis = {
          differenceComission: 0,
        };

        const result = DifferenceComissonCell.computed.isEqualZeroDifference.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if defined differenceComission not equal to zero', () => {
        const mockedThis = {
          differenceComission: 10,
        };

        const result = DifferenceComissonCell.computed.isEqualZeroDifference.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isNegativeDifference: ', () => {
      it('should return true if defined differenceComission less than zero', () => {
        const mockedThis = {
          differenceComission: -1,
        };

        const result = DifferenceComissonCell.computed.isNegativeDifference.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if defined differenceComission more than or equal to zero', () => {
        const mockedThis = {
          differenceComission: 10,
        };

        const result = DifferenceComissonCell.computed.isNegativeDifference.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });
  });
});
