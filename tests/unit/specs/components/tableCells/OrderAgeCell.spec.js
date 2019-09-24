import OrderAgeCell from '@/components/tableCells/OrderAgeCell';

const GREEN = 15;
const ORANGE = 30;
const RED = 45;

describe('OrderAgeCell: ', () => {
  describe('computed: ', () => {
    describe('GREEN: ', () => {
      it('should return true if created date order less than 16', () => {
        for (let value = 0; value <= GREEN; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.green.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if created date order more than 15', () => {
        const mockedThis = {
          value: ORANGE,
        };

        const result = OrderAgeCell.computed.green.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('ORANGE: ', () => {
      it('should return true if created date order more than 16', () => {
        for (let value = GREEN + 1; value <= ORANGE; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.orange.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if created date order more than 30', () => {
        const mockedThis = {
          value: RED,
        };

        const result = OrderAgeCell.computed.orange.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('RED: ', () => {
      it('should return true if created date order more than 30', () => {
        for (let value = ORANGE + 1; value <= RED; value += 1) {
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
