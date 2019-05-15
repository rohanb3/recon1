import qs from 'qs';

export const pickNotEmptyFields = (obj = {}) =>
  Object.entries(obj).reduce(
    (acc, [name, value]) => (value || value === 0 ? { ...acc, [name]: value } : acc),
    {}
  );

export function paramsSerializer(paramList) {
  return qs.stringify(paramList, { skipNulls: true, arrayFormat: 'repeat' });
}
