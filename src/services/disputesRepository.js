import apiDisputes from './disputesApi';

// eslint-disable-next-line import/prefer-default-export
export const getDisput = id => {
  return apiDisputes.get(`/dispute/${id}`).then(({ data }) => data);
};
