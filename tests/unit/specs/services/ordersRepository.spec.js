import disputesApi from '@/services/disputesApi';
import {
  getOrders,
  getServiceList,
  getOrderStatusList,
  getOrdersCsvFile,
} from '@/services/ordersRepository';
import { paramsSerializer } from '@/services/repositoryUtils';

describe('ordersRepository', () => {
  describe('getOrders', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        skip: 0,
        take: 10,
        orderIdFilter: 'Installed',
        creationAgeFilter: 10,
      };

      const data = { id: '777' };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getOrders(filters);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/order', {
        params: { ...filters },
        paramsSerializer,
      });
    });
  });

  describe('getServiceList', () => {
    it('should call api.get and return corect data', async () => {
      const data = { id: '777' };

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getServiceList();

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/order/service');
    });
  });

  describe('getOrderStatusList', () => {
    it('should call api.get and return correct data', async () => {
      const data = [{ id: 0, statusName: 'canceled' }, { id: 1, statusName: 'not_canceled' }];

      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getOrderStatusList();

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/order/status');
    });
  });

  describe('getOrdersCsvFile', () => {
    it('should call api.get and return corect data', async () => {
      const filters = {
        offset: 0,
        limit: 10,
        dateFrom: '2018-01-01T00:00:00Z',
        dateTo: '2019-03-22T23:59:59Z',
      };

      const data = { id: '777' };
      disputesApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getOrdersCsvFile(filters);

      expect(response).toEqual(data);
      expect(disputesApi.get).toHaveBeenCalledWith('/order/csv', expect.any(Object));
    });
  });
});
