import qs from 'qs';

export function removeExtraParameters(parametersObj, listOfExtraParameters) {
  const localParametersObj = { ...parametersObj };
  listOfExtraParameters.forEach(parameterName => delete localParametersObj[parameterName]);
  return localParametersObj;
}

export function paramsSerializer(paramList) {
  return qs.stringify(paramList, { skipNulls: true, arrayFormat: 'repeat' });
}

export function paramsSerializerWithRemoval(paramList, listOfExtraParameters) {
  return () => {
    return paramsSerializer(removeExtraParameters(paramList, listOfExtraParameters));
  };
}
