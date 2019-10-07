import disputesApi from '@/services/disputesApi';
import { getDisputes, getDisputesDailyStatistics } from '@/services/statisticsRepository';

describe('statisticsRepository', () => {
  describe('getDisputes', () => {
    it('should call api.get and return corect data', async () => {
      const params = {
        skip: 0,
        take: 10,
      };

      const data = { id: '777' };

      disputesApi.get = jest.fn(() => Promise.resolve({ ...data }));

      const response = await getDisputes(params);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/dashboard/disputes', { params });
    });
  });

  describe('getDisputesDailyStatistics', () => {
    it('should call api.get and return corect data', async () => {
      const params = {
        skip: 0,
        take: 10,
      };

      const data = { id: '777' };

      disputesApi.get = jest.fn(() => Promise.resolve({ ...data }));

      const response = await getDisputesDailyStatistics(params);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/dispute/days/statistics', { params });
    });
  });
});
