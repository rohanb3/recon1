import qs from 'qs';

// eslint-disable-next-line import/prefer-default-export
export function paramsSerializer(paramList) {
  return qs.stringify(paramList, { skipNulls: true, arrayFormat: 'repeat' });
}
