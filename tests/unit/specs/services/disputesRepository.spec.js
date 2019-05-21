import disputesApi from '@/services/disputesApi';
import {
  getDispute,
  getDisputes,
  createDispute,
  updateDispute,
  deleteDispute,
  getDisputeAttachment,
  uploadDisputeAttachment,
  removeDisputeAttachment,
  changeStatusDispute,
  getDisputesCsvFile,
} from '@/services/disputesRepository';

import { RESPONSE_STATUSES } from '@/constants';

describe('disputesRepository', () => {
  describe('getDispute', () => {
    it('should call api.get and return corect data', async () => {
      const id = 7;
      const data = { id: 1, orderId: 3, affiliateId: 3 };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDispute(id);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(`/dispute/${id}`);
    });
  });

  describe('getDisputes', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        skip: 0,
        take: 10,
      };

      const data = { id: '777' };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputes(filters);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/dispute', {
        params: { ...filters },
      });
    });
  });

  describe('createDispute', () => {
    it('should call api.post and return corect data', async () => {
      const orderId = 7;
      const data = { id: 1, orderId: 3, affiliateId: 3 };

      disputesApi.post = jest.fn(() => Promise.resolve({ data }));

      const response = await createDispute(orderId);

      expect(response).toEqual(data);
      expect(disputesApi.post).toHaveBeenCalledWith(`/dispute?orderId=${orderId}`);
    });
  });

  describe('updateDispute', () => {
    it('should call api.put and return corect data', async () => {
      const disputerId = 7;
      const updateData = {
        id: 1,
      };
      const data = { id: 1, orderId: 3, affiliateId: 3 };
      const status = RESPONSE_STATUSES.OK;

      disputesApi.put = jest.fn(() => Promise.resolve({ status, data }));

      const response = await updateDispute(disputerId, updateData);

      expect(response).toEqual({ data, status });
      expect(disputesApi.put).toHaveBeenCalledWith(`/dispute/${disputerId}`, updateData);
    });
  });

  describe('deleteDispute', () => {
    it('should call api.delete and return corect data', async () => {
      const disputerId = 7;
      const status = RESPONSE_STATUSES.OK;

      disputesApi.delete = jest.fn(() => Promise.resolve({ status }));

      const response = await deleteDispute(disputerId);

      expect(response).toEqual(status);
      expect(disputesApi.delete).toHaveBeenCalledWith(`/dispute/${disputerId}`);
    });
  });

  describe('getDisputeAttachment', () => {
    it('should call api.get and return corect data', async () => {
      const disputerId = 7;
      const data = { id: 1 };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputeAttachment(disputerId);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(`/disputeattachment/${disputerId}`);
    });
  });

  describe('uploadDisputeAttachment', () => {
    it('should call api.post and return corect data', async () => {
      const disputerId = 7;
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const updateData = {
        id: 1,
      };

      disputesApi.post = jest.fn(() => Promise.resolve());

      await uploadDisputeAttachment(disputerId, updateData);

      expect(disputesApi.post).toHaveBeenCalledWith(
        `/disputeattachment/${disputerId}`,
        updateData,
        { headers }
      );
    });
  });

  describe('removeDisputeAttachment', () => {
    it('should call api.delete and return corect data', async () => {
      const disputerId = 7;
      const filename = 'example.txt';
      const status = RESPONSE_STATUSES.OK;

      disputesApi.delete = jest.fn(() => Promise.resolve({ status }));

      const response = await removeDisputeAttachment(disputerId, filename);

      expect(response).toEqual(status);
      expect(disputesApi.delete).toHaveBeenCalledWith(
        `/disputeattachment/${disputerId}?filename=${filename}`
      );
    });
  });

  describe('changeStatusDispute', () => {
    it('should call api.patch and return corect data', async () => {
      const disputeId = 7;
      const status = '4f5yh3s257yh6';
      const userName = 'Dmitry';
      const comments = 'test1234';

      const params = {
        disputeId,
        status,
        userName,
        comments,
      };

      const data = { id: 7 };

      disputesApi.patch = jest.fn(() => Promise.resolve({ data }));

      const response = await changeStatusDispute(params);
      expect(response).toEqual(data);
      expect(disputesApi.patch).toHaveBeenCalledWith(
        `/dispute/${disputeId}?status=${status}&userName=${userName}&comments=${comments}`
      );
    });
  });

  describe('getDisputesCsvFile', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        offset: 0,
        limit: 10,
        dateFrom: '2018-01-01T00:00:00Z',
        dateTo: '2019-03-22T23:59:59Z',
      };

      const data = { id: '777' };
      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputesCsvFile(filters);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/dispute/csv', expect.any(Object));
    });
  });
});
