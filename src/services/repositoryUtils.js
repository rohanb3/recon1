// eslint-disable-next-line import/prefer-default-export
export const pickNotEmptyFields = (obj = {}) =>
  Object.entries(obj).reduce(
    (acc, [name, value]) => (value || value === 0 ? { ...acc, [name]: value } : acc),
    {}
  );
