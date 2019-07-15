import Footer from '@/components/WombatTable/Footer';

describe('WombatTable:footer: ', () => {
  describe('computed: ', () => {
    describe('preparedColumns', () => {
      it('should return empty array if columns is empty', () => {
        const mockedThis = {
          columns: [],
        };

        const result = Footer.computed.preparedColumns.call(mockedThis);

        expect(result).toEqual([]);
      });

      it('should return array with width if defined width', () => {
        const mockedThis = {
          columns: [{ width: 100, name: 'address' }],
        };

        const result = Footer.computed.preparedColumns.call(mockedThis);
        const expectedResult = [
          { _className: 'column-address', name: 'address', style: { width: 100 }, width: 100 },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should return array with flex if not defined width', () => {
        const mockedThis = {
          columns: [{ name: 'address' }],
        };

        const result = Footer.computed.preparedColumns.call(mockedThis);
        const expectedResult = [
          { _className: 'column-address', name: 'address', style: { flex: 1 } },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should return array with class name if not defined name', () => {
        const mockedThis = {
          columns: [{ fieldType: 'address' }],
        };

        const result = Footer.computed.preparedColumns.call(mockedThis);
        const expectedResult = [
          { _className: 'column-column0', fieldType: 'address', style: { flex: 1 } },
        ];
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
