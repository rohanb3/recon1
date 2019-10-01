import apiDisputes from './disputesApi';

export const getDisputes = params => {
  return apiDisputes.get('/dashboard/disputes', { params }).then(data => data);
};

export const getClaims = params => {
  return apiDisputes.get('/dashboard/claims', { params }).then(data => data);
};

export const getDailyStatistics = params => {
  return apiDisputes.get('/dispute/days/statistics', { params }).then(data => data);
};
