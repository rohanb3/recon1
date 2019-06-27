import qs from 'qs';
import flatten from 'lodash.flatten';

export const pickNotEmptyFields = (obj = {}) =>
  Object.entries(obj).reduce(
    (acc, [name, value]) => (value || value === 0 ? { ...acc, [name]: value } : acc),
    {}
  );

export function paramsSerializer(paramList) {
  return qs.stringify(paramList, { skipNulls: true, arrayFormat: 'repeat' });
}

export function mergeParameters(parametersObj, listOfParametersToMerge, fieldName) {
  let joinedParameters = [];
  listOfParametersToMerge.forEach(parameterName => {
    if (parametersObj[parameterName]) {
      joinedParameters = joinedParameters.concat(parametersObj[parameterName]);
    }
  });
  return { ...parametersObj, [fieldName]: Array.from(new Set(flatten(joinedParameters))) };
}

export function removeExtraParameters(parametersObj, ...listOfParameters) {
  const localParametersObj = { ...parametersObj };
  listOfParameters.forEach(parameterName => delete localParametersObj[parameterName]);
  return localParametersObj;
}
