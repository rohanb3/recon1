import qs from 'qs';
import { pickNotEmptyFields } from '@/services/repositoryUtils';
import { paramsSerializer } from '@/services/serializers';

describe('repositoryUtils', () => {
  describe('pickNotEmptyFields', () => {
    it('should return empty object if no data passed', () => {
      expect(pickNotEmptyFields()).toEqual({});
    });

    it('should filter not empty fields', () => {
      const data = {
        name: 'Dmitry',
        age: null,
      };

      const expectedData = {
        name: 'Dmitry',
      };

      expect(pickNotEmptyFields(data)).toEqual(expectedData);
    });

    it('should not ignore 0', () => {
      const data = {
        name: 'Dmitry',
        age: 0,
        home: null,
      };

      const expectedData = {
        name: 'Dmitry',
        age: 0,
      };

      expect(pickNotEmptyFields(data)).toEqual(expectedData);
    });
  });

  describe('paramsSerializer', () => {
    it('should return formatted string if passed parameters', () => {
      const paramList = { id: [1, 2, 3], from: '2019-01-01', to: '2019-06-01' };
      const stringifySpy = jest.spyOn(qs, 'stringify');

      const result = paramsSerializer(paramList);

      const expectedResult = 'id=1&id=2&id=3&from=2019-01-01&to=2019-06-01';
      expect(result).toEqual(expectedResult);
      expect(stringifySpy).toHaveBeenCalledWith(paramList, {
        arrayFormat: 'repeat',
        skipNulls: true,
      });
    });
  });
});
