import apiDisputes from './disputesApi';
import { paramsSerializer } from '@/services/repositoryUtils';

export const getDispute = id => {
  return apiDisputes.get(`/dispute/${id}`).then(({ data }) => data);
};

export const getDisputes = filters => {
  const params = { ...filters };
  return apiDisputes.get('/dispute', { params, paramsSerializer }).then(({ data }) => data);
};

export const createDispute = orderId => {
  return apiDisputes.post(`/dispute?orderId=${orderId}`).then(({ data }) => data);
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
  return apiDisputes.get(`/disputeattachment/${id}`).then(({ data }) => data);
};

export const uploadDisputeAttachment = (id, updates = {}) => {
  return apiDisputes.post(`/disputeattachment/${id}`, updates, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const removeDisputeAttachment = (id, filename) => {
  return apiDisputes
    .delete(`/disputeattachment/${id}?filename=${filename}`)
    .then(({ status }) => status);
};

export const changeStatusDispute = ({ disputeId, ...params }) => {
  return apiDisputes.patch(`/dispute/${disputeId}`, null, { params }).then(({ data }) => data);
};

export const getDisputesCsvFile = filters => {
  const params = { ...filters };
  return apiDisputes.get('/dispute/csv', { params, paramsSerializer }).then(({ data }) => data);
};

export const getDisputeHistory = filters => {
  const { disputeId, ...params } = filters;
  return apiDisputes.get(`/dispute/${disputeId}/history`, { params }).then(({ data }) => data);
};
