import apiDisputes from './disputesApi';
import { paramsSerializer } from '@/services/serializers';

export const getDispute = id => {
  return apiDisputes.get(`/dispute/${id}`).then(({ data }) => data);
};

export const getDisputesStatisticsBySubmitters = filters => {
  const params = { ...filters };

  return apiDisputes.get(`/disputes/statistic/submitters`, { params }).then(data =>
    Object.assign(data, {
      data: (data.data.data || []).map(item => ({ ...item, id: item.creator.ObjectId })),
    })
  );
};

export const getClaimsStatisticsBySubmitters = filters => {
  const params = { ...filters };

  return apiDisputes.get(`/claims/statistic/submitters`, { params }).then(data =>
    Object.assign(data, {
      data: (data.data.data || []).map(item => ({ ...item, id: item.creator.ObjectId })),
    })
  );
};

export const getDisputes = params => {
  return apiDisputes.get('/dispute', { params, paramsSerializer }).then(({ data }) => data);
};

export const createDispute = orderId => {
  return apiDisputes.post(`/dispute?orderId=${orderId}`).then(({ data }) => data);
};

export const createClaim = orderId => {
  return apiDisputes.post(`/claim?orderId=${orderId}`).then(({ data }) => data);
};

export const updateDispute = (id, updates = {}) => {
  return apiDisputes.put(`/dispute/${id}`, updates).then(({ data, status }) => ({
    data,
    status,
  }));
};

export const deleteDispute = id => {
  return apiDisputes.delete(`/dispute/${id}`).then(({ status }) => status);
};

export const getDisputeAttachment = id => {
  return apiDisputes.get(`/attachment/dispute/${id}`).then(({ data }) => data);
};

export const uploadDisputeAttachment = (id, updates = {}) => {
  return apiDisputes.post(`/attachment/dispute/${id}`, updates, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const removeDisputeAttachment = (id, filename) => {
  return apiDisputes
    .delete(`/attachment/dispute/${id}?filename=${filename}`)
    .then(({ status }) => status);
};

export const changeStatusDispute = ({ id, ...params }) => {
  return apiDisputes.patch(`/dispute/${id}`, null, { params }).then(({ data }) => data);
};

export const changeStatusClaim = ({ id, ...params }) => {
  return apiDisputes.patch(`/claim/${id}`, null, { params }).then(({ data }) => data);
};

export const getDisputesCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes.get('/dispute/csv', { params, paramsSerializer }).then(({ data }) => data);
};

export const getClaimsCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes.get('/claim/csv', { params, paramsSerializer }).then(({ data }) => data);
};

export const getDisputesStatistics = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/disputes/statistic/top', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getClaimsStatistics = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/claims/statistic/top', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getDisputesBySubmittersCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/disputes/statistic/submitters/csv', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getClaimsBySubmittersCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes
    .get('/claims/statistic/submitters/csv', { params, paramsSerializer })
    .then(({ data }) => data);
};

export const getDisputeHistory = filters => {
  const { id, ...params } = filters;
  return apiDisputes.get(`/dispute/${id}/history`, { params }).then(({ data }) => data);
};

export const getClaims = params => {
  return apiDisputes.get('/claim', { params, paramsSerializer }).then(({ data }) => data);
};

export const getClaimTypes = () => {
  return apiDisputes.get('/claim/type').then(({ data }) => data);
};

export const getDisputeTypes = () => {
  return apiDisputes.get('/dispute/type').then(({ data }) => data);
};

export const updateClaim = (id, updates = {}) => {
  return apiDisputes.put(`/claim/${id}`, updates).then(({ data, status }) => ({
    data,
    status,
  }));
};

export const getClaim = id => {
  return apiDisputes.get(`/claim/${id}`).then(({ data }) => data);
};

export const getClaimAttachment = id => {
  return apiDisputes.get(`/attachment/claim/${id}`).then(({ data }) => data);
};

export const uploadClaimAttachment = (id, updates = {}) => {
  return apiDisputes.post(`/attachment/claim/${id}`, updates, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const removeClaimAttachment = (id, filename) => {
  return apiDisputes
    .delete(`/attachment/claim/${id}?filename=${filename}`)
    .then(({ status }) => status);
};

export const deleteClaim = id => {
  return apiDisputes.delete(`/claim/${id}`).then(({ status }) => status);
};

export const getClaimHistory = filters => {
  const { id, ...params } = filters;
  return apiDisputes.get(`/claim/${id}/history`, { params }).then(({ data }) => data);
};
