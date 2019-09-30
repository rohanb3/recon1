function getObjectValue(obj, key) {
  return obj[key];
}

const getObjectFromArrayByKey = (array, key, value) => {
  return array.reduce(
    (acc, item) =>
      Object.assign(acc, {
        [getObjectValue(item, key)]: value ? getObjectValue(item, value) : item,
      }),
    {}
  );
};

// eslint-disable-next-line
export { getObjectFromArrayByKey };
