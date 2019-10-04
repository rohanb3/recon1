function extractObjectKey(obj) {
  return obj.key;
}

function extractObjectValue(obj) {
  return obj.value;
}

const getObjectFromArrayByKey = (array, key = extractObjectKey, value = extractObjectValue) => {
  return array.reduce(
    (acc, item) =>
      Object.assign(acc, {
        [key(item)]: value(item) || item,
      }),
    {}
  );
};

// eslint-disable-next-line
export { getObjectFromArrayByKey };
