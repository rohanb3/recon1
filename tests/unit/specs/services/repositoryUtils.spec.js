import qs from 'qs';
import {
  pickNotEmptyFields,
  paramsSerializer,
  mergeParameters,
  removeExtraParameters,
} from '@/services/repositoryUtils';

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

  describe('mergeParameters', () => {
    it('should return an object with merged parameters', () => {
      const parametersObj = {
        id: 1,
        xyz: ['dsws', 'qwe', 455],
        spectrum: ['sdfsdf', 'hfstedt'],
        orderId: 3,
      };

      const listOfParametersToMerge = ['xyz', 'spectrum', 'orderId'];

      const fieldName = 'disputeIds';
      const result = mergeParameters(parametersObj, listOfParametersToMerge, fieldName);

      const expectedResult = {
        id: 1,
        xyz: ['dsws', 'qwe', 455],
        spectrum: ['sdfsdf', 'hfstedt'],
        orderId: 3,
        [fieldName]: ['dsws', 'qwe', 455, 'sdfsdf', 'hfstedt', 3],
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeExtraParameters', () => {
    it('should return an object with the extra properties removed', () => {
      const parametersObj = {
        id: 1,
        xyz: ['dsws', 'qwe', 455],
        spectrum: ['sdfsdf', 'hfstedt'],
        orderId: 3,
      };

      const listOfExtraParameters = ['xyz', 'spectrum'];

      const result = removeExtraParameters(parametersObj, ...listOfExtraParameters);

      const expectedResult = {
        id: 1,
        orderId: 3,
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
