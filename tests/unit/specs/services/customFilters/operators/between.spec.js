import i18n from '@/i18n';
import between from '@/services/customFilters/operators/between';

describe('customFilters/operators/between', () => {
  describe('apply', () => {
    it('should return corect object with numbers if passed corect data', () => {
      const range = { from: '10', to: '20' };

      const result = between.apply(range);

      const expectedData = { from: 10, to: 20 };
      expect(result).toEqual(expectedData);
    });

    it('should return object with NaN number if passed incorect second parameter', () => {
      const range = { from: '10', to: 'text' };

      const result = between.apply(range);

      const expectedData = { from: 10, to: NaN };
      expect(result).toEqual(expectedData);
    });

    it('should return object with 1 paremetr if passed empty second parameter', () => {
      const range = { from: '10', to: '' };

      const result = between.apply(range);

      const expectedData = { from: 10 };
      expect(result).toEqual(expectedData);
    });
  });

  describe('validate', () => {
    it('should return empty string if passed corect data', () => {
      const from = 2;
      const to = 5;
      const options = { min: 1 };

      const result = between.validate({ from, to }, options);

      expect(result).toEqual('');
    });

    it('should return message if passed small number', () => {
      const from = 2;
      const to = 5;
      const options = { min: 3 };

      i18n.t = jest.fn(value => value);
      const result = between.validate({ from, to }, options);

      const expectedString = 'validation.rule.number.too.small';
      expect(result).toEqual(expectedString);
    });

    it('should return message if passed incorect data', () => {
      const from = 2;
      const to = 'five';
      const options = { min: 1 };

      i18n.t = jest.fn(value => value);
      const result = between.validate({ from, to }, options);

      const expectedString = 'field.must.consist.only.digits';
      expect(result).toEqual(expectedString);
    });

    it('should return message if passed negative rage', () => {
      const from = 20;
      const to = 2;
      const options = { min: 1 };

      i18n.t = jest.fn(value => value);
      const result = between.validate({ from, to }, options);

      const expectedString = 'validation.rule.rage.negative';
      expect(result).toEqual(expectedString);
    });
  });
});
