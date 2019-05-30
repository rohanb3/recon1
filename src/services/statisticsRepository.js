import apiDisputes from './disputesApi';

// eslint-disable-next-line import/prefer-default-export
export const getDisputes = params => {
  return apiDisputes.get('/dashboard/disputes', { params }).then(({ data }) => data);
};
