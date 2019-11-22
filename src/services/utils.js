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
    return shortItemList.join(', ');
  }

  if (shortItemList.length > outputItems) {
    shortItemList.pop();
    return `${shortItemList.join(', ')}...`;
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

export function imageEncode(arrayBuffer) {
  const b64encoded = btoa(
    new Uint8Array(arrayBuffer).reduce((p, c) => p + String.fromCharCode(c), '')
  );

  return `data:image/jpeg;base64,${b64encoded}`;
}

export function notEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

export function generateCSVFile(CSVFile, fileName = 'report') {
  const csvData = new Blob([CSVFile], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(csvData);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

export function getMinAndMax(list, func = item => item) {
  const init = list[0] && func ? func(list[0]) : list[0];
  let maxResult = !Number.isNaN(Number(init)) ? init : 0;
  let minResult = !Number.isNaN(Number(init)) ? init : 0;
  list.forEach(record => {
    const value = func(record);
    if (Number.isNaN(Number(value))) {
      return;
    }
    if (value > maxResult) {
      maxResult = value;
    }
    if (value < minResult) {
      minResult = value;
    }
  });
  return {
    min: minResult,
    max: maxResult,
  };
}
