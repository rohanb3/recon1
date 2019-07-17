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
  getDisputeHistory,
  getDisputesStatisticsBySubmitters,
  getDisputesStatistics,
  getDisputesBySubmittersCsvFile,
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
      expect(disputesApi.get).toHaveBeenCalledWith('/dispute', expect.any(Object));
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
        status,
        userName,
        comments,
      };

      const data = { id: 7 };

      disputesApi.patch = jest.fn(() => Promise.resolve({ data }));

      const response = await changeStatusDispute({ disputeId, ...params });
      expect(response).toEqual(data);
      expect(disputesApi.patch).toHaveBeenCalledWith(`/dispute/${disputeId}`, null, { params });
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

  describe('getDisputeHistory', () => {
    it('should call api.get and return corect data', async () => {
      const disputeId = '4hfysb547fj347sh278rf';

      const params = {
        Skip: 0,
        Take: 10,
      };

      const data = { id: '777' };
      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputeHistory({ disputeId, ...params });

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(`/dispute/${disputeId}/history`, { params });
    });
  });

  describe('getDisputesStatisticsBySubmitters', () => {
    it('should call api.get and return corect data', async () => {
      const params = {
        Skip: 0,
        Take: 10,
      };

      const data = {
        data: [
          {
            creator: {
              ObjectId: 'b0579456-65ad-4099-91bd-3498208aa922',
              displayName: 'santhi akella',
              scopes: null,
              role: 'SystemAdmin',
            },
            entered: 1,
            lastDisputeCreatedDate: '2019-06-20T09:10:45.6464358',
          },
        ],
        total: 1,
      };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputesStatisticsBySubmitters(params);

      const expectedresult = {
        data: [
          {
            creator: {
              ObjectId: 'b0579456-65ad-4099-91bd-3498208aa922',
              displayName: 'santhi akella',
              role: 'SystemAdmin',
              scopes: null,
            },
            entered: 1,
            id: 'b0579456-65ad-4099-91bd-3498208aa922',
            lastDisputeCreatedDate: '2019-06-20T09:10:45.6464358',
          },
        ],
      };

      expect(response).toEqual(expectedresult);
      expect(disputesApi.get).toHaveBeenCalledWith(`/disputes/statistic/submitters`, { params });
    });
  });

  describe('getDisputesStatistics', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        offset: 0,
        limit: 10,
        dateFrom: '2018-01-01T00:00:00Z',
        dateTo: '2019-03-22T23:59:59Z',
      };

      const data = { id: '777' };
      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputesStatistics(filters);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/disputes/statistic/top', expect.any(Object));
    });
  });

  describe('getDisputesBySubmittersCsvFile', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        offset: 0,
        limit: 10,
        dateFrom: '2018-01-01T00:00:00Z',
        dateTo: '2019-03-22T23:59:59Z',
      };

      const data = { id: '777' };
      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getDisputesBySubmittersCsvFile(filters);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith(
        '/disputes/statistic/submitters/csv',
        expect.any(Object)
      );
    });
  });
});
