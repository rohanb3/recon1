import OrderAgeCell from '@/components/tableCells/OrderAgeCell';

describe('OrderAgeCell: ', () => {
  describe('computed: ', () => {
    describe('GREEN: ', () => {
      it('should return true if created date order less than 16', () => {
        for (let value = 0; value < 16; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.green.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if created date order more than 15', () => {
        const mockedThis = {
          value: 20,
        };

        const result = OrderAgeCell.computed.green.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('ORANGE: ', () => {
      it('should return true if created date order more than 16', () => {
        for (let value = 16; value < 31; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.orange.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if created date order more than 30', () => {
        const mockedThis = {
          value: 31,
        };

        const result = OrderAgeCell.computed.orange.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('RED: ', () => {
      it('should return true if created date order more than 30', () => {
        for (let value = 31; value < 46; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.red.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if created date order more than 45', () => {
        const mockedThis = {
          value: 46,
        };

        const result = OrderAgeCell.computed.red.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('BLACK: ', () => {
      it('should return true if created date order more than 45', () => {
        const mockedThis = {
          value: 50,
        };

        const result = OrderAgeCell.computed.black.call(mockedThis);

        expect(result).toBeTruthy();
      });
    });
  });
});
