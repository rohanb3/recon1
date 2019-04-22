import apiDisputs from './disputsApi';

// eslint-disable-next-line import/prefer-default-export
export const getOrders = filters => {
  const params = { ...filters };
  return apiDisputs.get('/order', { params }).then(({ data }) => data);
};
