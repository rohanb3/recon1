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

export function addBackgroundBlur() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.add('blurred');
  }
}

export function removeBackgroundBlur() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.remove('blurred');
  }
}

export function imageEncode(arrayBuffer) {
  const b64encoded = btoa(
    new Uint8Array(arrayBuffer).reduce((p, c) => p + String.fromCharCode(c), '')
  );

  return `data:image/jpeg;base64,${b64encoded}`;
}

export function generateCSVFile(CSVFile, fileName = 'report') {
  const download = document.createElement('a');
  download.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(CSVFile)}`);
  download.setAttribute('download', `${fileName}.csv`);
  download.click();
}
