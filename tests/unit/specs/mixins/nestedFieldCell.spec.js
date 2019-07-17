import nestedFieldCell from '@/mixins/nestedFieldCell';

describe('nestedFieldCell mixin', () => {
  describe('props', () => {
    describe('filter', () => {
      it('should return value that was passed', () => {
        const result = nestedFieldCell.props.filter.default(132);

        expect(result).toEqual(132);
      });
    });
  });

  describe('filteredValue', () => {
    it('should call method filter with parameter', () => {
      const fakeThis = {
        filter: jest.fn(),
        value: '1234',
      };

      nestedFieldCell.computed.filteredValue.call(fakeThis);

      expect(fakeThis.filter).toHaveBeenCalledWith(fakeThis.value);
    });
  });
  describe('fields', () => {
    it('should return correct array if delimiter presents', () => {
      const fakeThis = {
        column: { field: 'car.model' },
      };

      const expectedData = ['car', 'model'];

      const result = nestedFieldCell.computed.fields.call(fakeThis);

      expect(expectedData).toEqual(result);
    });

    it('should return correct array if no delimiter presents', () => {
      const fakeThis = {
        column: { field: 'carmodel' },
      };

      const expectedData = ['carmodel'];

      const result = nestedFieldCell.computed.fields.call(fakeThis);

      expect(expectedData).toEqual(result);
    });

    it('should return correct array if no field presents', () => {
      const fakeThis = {
        column: { field: null },
      };

      const expectedData = [];

      const result = nestedFieldCell.computed.fields.call(fakeThis);
      expect(expectedData).toEqual(result);
    });
  });

  describe('isShowTitle', () => {
    it('should return true if showTitle defined as true', () => {
      const fakeThis = {
        column: {
          showTitle: true,
        },
      };

      const result = nestedFieldCell.computed.isShowTitle.call(fakeThis);

      expect(result).toBeTruthy();
    });

    it('should return false if showTitle defined as false', () => {
      const fakeThis = {
        column: {
          showTitle: false,
        },
      };

      const result = nestedFieldCell.computed.isShowTitle.call(fakeThis);

      expect(result).toBeFalsy();
    });
  });

  describe('title', () => {
    it('should return string if isShowTitle defined as true', () => {
      const fakeThis = {
        isShowTitle: true,
        filteredValue: 'qwerty',
      };

      const result = nestedFieldCell.computed.title.call(fakeThis);

      expect(result).toEqual(fakeThis.filteredValue);
    });

    it('should return empty string if isShowTitle defined as false', () => {
      const fakeThis = {
        isShowTitle: false,
        filteredValue: 'qwerty',
      };

      const result = nestedFieldCell.computed.title.call(fakeThis);

      expect(result).toEqual('');
    });
  });

  describe('value', () => {
    it('should return correct string if fields coincide', () => {
      const fakeThis = {
        fields: ['car', 'model'],
        item: { car: { model: 'Tesla' } },
      };

      const expectedData = 'Tesla';
      const result = nestedFieldCell.computed.value.call(fakeThis);
      expect(expectedData).toEqual(result);
    });

    it('should return undefined if fields do not coincide', () => {
      const fakeThis = {
        fields: ['other', 'field'],
        item: { car: { model: 'Tesla' } },
      };

      const result = nestedFieldCell.computed.value.call(fakeThis);
      expect(result).toBeNull();
    });
  });
});
