// eslint-disable-next-line import/prefer-default-export
export function extractPropertiesFromArrObj(dataArray, selectField = "id") {
  try {
    return dataArray.map(item => item[selectField]);
  } catch (err) {
    return [];
  }
}
