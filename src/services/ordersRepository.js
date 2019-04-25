import apiDisputes from './disputesApi';

// eslint-disable-next-line import/prefer-default-export
export const getOrders = filters => {
  const params = { ...filters };
  return apiDisputes.get('/order', { params }).then(({ data }) => data);
};
