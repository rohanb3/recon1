// eslint-disable-next-line import/prefer-default-export
export function extractPropertiesFromArrObj(dataArray, selectField = 'id') {
  try {
    return dataArray.map(item => item[selectField]);
  } catch (err) {
    return [];
  }
}

export function getStringFromValuesByKey(itemKey, items = [], outputItems = 3) {
  if (!itemKey) return '';

  const shortItemList = items
    .slice(0, outputItems + 1)
    .reduce((acc, item) => (item[itemKey] ? [...acc, item[itemKey]] : acc), []);

  if (shortItemList.length > 0 && shortItemList.length <= outputItems) {
    return `: ${shortItemList.join(', ')}`;
  }

  if (shortItemList.length > outputItems) {
    shortItemList.pop();
    return `: ${shortItemList.join(', ')}...`;
  }

  return '';
}

export function sortingRuleForObject(propertyName) {
  return (currentItem, nextItem) => {
    if (currentItem[propertyName] > nextItem[propertyName]) {
      return 1;
    }
    if (currentItem[propertyName] < nextItem[propertyName]) {
      return -1;
    }
    return 0;
  };
}
