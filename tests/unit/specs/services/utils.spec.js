import {
  extractPropertiesFromArrObj,
  getStringFromValuesByKey,
  notEmpty,
  sortingRuleForObject,
  getMinAndMaxFromList,
} from '@/services/utils';

describe('utils', () => {
  describe('extractPropertiesFromArrObj', () => {
    it('should return array id ', () => {
      const stateArray = [{ id: 1, name: 'Alabama' }, { id: 2, name: 'Alaska' }];

      const result = extractPropertiesFromArrObj(stateArray, ['id']);

      const expectedData = [1, 2];
      expect(expectedData).toEqual(result);
    });

    it('should return array id if dont pass second parametr', () => {
      const stateArray = [
        { id: 1, name: 'Alabama', selected: true },
        { id: 2, name: 'Alaska', selected: false },
      ];

      const result = extractPropertiesFromArrObj(stateArray);

      const expectedData = [1, 2];
      expect(result).toEqual(expectedData);
    });

    it('should return empty array if dont pass two parametr ', () => {
      const result = extractPropertiesFromArrObj();

      expect([]).toEqual(result);
    });
  });

  describe('selectedItemsForTitle: ', () => {
    it('should return empty string if passed empty itemKey', () => {
      const items = [
        { id: 1, name: 'Alabama', value: 'AL', selected: true },
        { id: 2, name: 'Alaska', value: 'AK' },
      ];

      const result = getStringFromValuesByKey('', items, 3);

      const expectedString = '';

      expect(result).toEqual(expectedString);
    });

    it('should return string without dots at the end', () => {
      const items = [
        { id: 1, name: 'Alabama', value: 'AL', selected: true },
        { id: 2, name: 'Alaska', value: 'AK' },
      ];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = 'Alabama, Alaska';

      expect(result).toEqual(expectedString);
    });

    it('should return string without dots at the end', () => {
      const items = [
        { id: 1, name: 'Alabama', value: 'AL', selected: true },
        { id: 2, name: 'Alaska', value: 'AK' },
        { id: 3, name: 'Arizona', value: 'AZ', selected: true },
      ];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = 'Alabama, Alaska, Arizona';

      expect(result).toEqual(expectedString);
    });

    it('should return string with dots at the end', () => {
      const items = [
        { id: 1, name: 'Alabama', value: 'AL', selected: true },
        { id: 2, name: 'Alaska', value: 'AK' },
        { id: 3, name: 'Arizona', value: 'AZ', selected: true },
        { id: 4, name: 'Arkansas', value: 'AR' },
      ];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = 'Alabama, Alaska, Arizona...';

      expect(result).toEqual(expectedString);
    });

    it('should return empty string if selectedItems is empty', () => {
      const items = [];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = '';

      expect(result).toEqual(expectedString);
    });

    it('should return empty string if item not found in the list', () => {
      const items = [{ id: 1, value: 'AL', selected: true }, { id: 4, value: 'AR' }];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = '';

      expect(result).toEqual(expectedString);
    });
  });
  describe('notEmpty', () => {
    it('should return true if value is not empty', () => {
      const obj = {
        id: 1,
      };

      const result = notEmpty(obj);

      expect(result).toEqual(true);
    });

    it('should return false if value empty', () => {
      let value;

      const result = notEmpty(value);

      expect(result).toEqual(false);
    });
  });

  describe('sortingRuleForObject', () => {
    it('should return sorted array', () => {
      const arr = [
        {
          id: 10,
        },
        {
          id: 2,
        },
        {
          id: 1,
        },
        {
          id: 5,
        },
        {
          id: 2,
        },
      ];

      const result = arr.filter(item => item).sort(sortingRuleForObject('id'));

      const expectedResult = [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 2,
        },
        {
          id: 5,
        },
        {
          id: 10,
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });
  describe('getMinAndMaxFromList', () => {
    it('should return max and min equal 0 if list is empty (with func param)', () => {
      const list = [];
      const actual = getMinAndMaxFromList(list, el => el.val);
      const expected = { min: 0, max: 0 };
      expect(actual).toEqual(expected);
    });

    it('should return max and min equal 0 if list is empty (without func param)', () => {
      const list = [];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: 0, max: 0 };
      expect(actual).toEqual(expected);
    });

    it('should return (max and min) if list contains objects and min value and max values are different and both are positive (with func param)', () => {
      const obj1 = {
        val: 1,
      };
      const obj2 = {
        val: 2,
      };
      const obj3 = {
        val: 3,
      };
      const list = [obj1, obj2, obj3];
      const actual = getMinAndMaxFromList(list, el => el.val);
      const expected = { min: 1, max: 3 };
      expect(actual).toEqual(expected);
    });

    it('should return (max and min) if list contains objects and min value and max values are different and both are negative (with func param)', () => {
      const obj1 = {
        val: -1,
      };
      const obj2 = {
        val: -2,
      };
      const obj3 = {
        val: -3,
      };
      const list = [obj1, obj2, obj3];
      const actual = getMinAndMaxFromList(list, el => el.val);
      const expected = { min: -3, max: -1 };
      expect(actual).toEqual(expected);
    });

    it('should return (max and min) if list contains objects and min value and max values are different and max positive and min negative (with func param)', () => {
      const obj1 = {
        val: -1,
      };
      const obj2 = {
        val: -2,
      };
      const obj3 = {
        val: 4,
      };
      const list = [obj1, obj2, obj3];
      const actual = getMinAndMaxFromList(list, el => el.val);
      const expected = { min: -2, max: 4 };
      expect(actual).toEqual(expected);
    });

    it("should return (max and min) if list doesn't contains objects and min value and max values are different and both are positive (without func param)", () => {
      const list = [1, 2, 3];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: 1, max: 3 };
      expect(actual).toEqual(expected);
    });

    it("should return (max and min) if list doesn't contains objects and min value and max values are different and both are negative (without func param)", () => {
      const list = [-1, -2, -3];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: -3, max: -1 };
      expect(actual).toEqual(expected);
    });

    it("should return (max and min) if list doesn't contains objects and min value and max values are different and max positive and min negative (without func param)", () => {
      const list = [-1, -2, 4];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: -2, max: 4 };
      expect(actual).toEqual(expected);
    });

    it('should return min and max equal 0 if list contains objects (without func param)', () => {
      const obj1 = {
        val: 1,
      };
      const obj2 = {
        val: 2,
      };
      const obj3 = {
        val: 3,
      };
      const list = [obj1, obj2, obj3];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: 0, max: 0 };
      expect(actual).toEqual(expected);
    });

    it("should return max and min if list doesn't contains objects (without func param)", () => {
      const list = [1, 2, 3];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: 1, max: 3 };
      expect(actual).toEqual(expected);
    });

    it('should return max and min with same values if list contains objects and max and min are equal (with func param)', () => {
      const obj1 = {
        val: 2,
      };
      const obj2 = {
        val: 2,
      };
      const obj3 = {
        val: 2,
      };
      const list = [obj1, obj2, obj3];
      const actual = getMinAndMaxFromList(list, el => el.val);
      const expected = { min: 2, max: 2 };
      expect(actual).toEqual(expected);
    });

    it("should return max and min with same values if list doesn't contains objects and max and min are equal (without func param)", () => {
      const list = [2, 2, 2];
      const actual = getMinAndMaxFromList(list);
      const expected = { min: 2, max: 2 };
      expect(actual).toEqual(expected);
    });
  });
});
