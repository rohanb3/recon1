export const pickNotEmptyFields = (obj = {}) =>
  Object.entries(obj).reduce(
    (acc, [name, value]) => (value || value === 0 ? { ...acc, [name]: value } : acc),
    {}
  );

export default pickNotEmptyFields;
