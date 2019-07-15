import OrderAgeCell from '@/components/tableCells/OrderAgeCell';

const NEWLY_CREATED_ORDER = 10;
const WAITING_ORDER = 34;

describe('OrderAgeCell: ', () => {
  describe('computed: ', () => {
    describe('isNewOrder: ', () => {
      it('should return true if newly created order', () => {
        for (let value = 0; value <= NEWLY_CREATED_ORDER; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.isNewOrder.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if order in not new', () => {
        const mockedThis = {
          value: 11,
        };

        const result = OrderAgeCell.computed.isNewOrder.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isWaitingOrder: ', () => {
      it('should return true if onrder not newly created and not overdue', () => {
        for (let value = NEWLY_CREATED_ORDER + 1; value <= WAITING_ORDER; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.isWaitingOrder.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if order overdue', () => {
        const mockedThis = {
          value: 35,
        };

        const result = OrderAgeCell.computed.isWaitingOrder.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });

    describe('isWaitingOrder: ', () => {
      it('should return true if onrder overdue', () => {
        for (let value = WAITING_ORDER + 1; value <= WAITING_ORDER + 10; value += 1) {
          const mockedThis = {
            value,
          };

          const result = OrderAgeCell.computed.isOverdueOrder.call(mockedThis);

          expect(result).toBeTruthy();
        }
      });

      it('should return false if order not overdue', () => {
        const mockedThis = {
          value: 34,
        };

        const result = OrderAgeCell.computed.isOverdueOrder.call(mockedThis);

        expect(result).toBeFalsy();
      });
    });
  });
});
