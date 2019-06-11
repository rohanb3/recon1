import disputesApi from '@/services/disputesApi';
import {
  getOrders,
  getServiceList,
  getOrderStatusList,
  orderSync,
  checkOrderSync,
  getOrdersCsvFile,
  getFiscalPeriods,
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
      expect(disputesApi.get).toHaveBeenCalledWith('/order/disputing/status');
    });
  });

  describe('orderSync', () => {
    it('should call api.post and return correct data', async () => {
      const dateRange = {
        syncOrderFromDate: '2018-11-20T00:00:00Z',
        syncOrderToDate: '2019-05-20T23:59:59Z',
      };

      const taskId = '28fec555-817d-4ded-a3cf-1f74c01dcb30';

      disputesApi.post = jest.fn(() => Promise.resolve({ data: taskId }));

      const response = await orderSync(dateRange);

      expect(response).toEqual(taskId);
      expect(disputesApi.post).toHaveBeenCalledWith('/ordersync', dateRange);
    });
  });

  describe('checkOrderSync', () => {
    it('should call api.get and return correct data', async () => {
      const taskId = '28fec555-817d-4ded-a3cf-1f74c01dcb30';

      disputesApi.get = jest.fn(() => Promise.resolve({ data: taskId }));

      const response = await checkOrderSync(taskId);

      expect(response).toEqual(taskId);
      expect(disputesApi.get).toHaveBeenCalledWith(`/ordersync/${taskId}`);
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

describe('getFiscalPeriods', () => {
  it('should call api.get and return corect data', async () => {
    const data = [
      {
        id: '4c7c60d3-e46b-4120-9df6-1116ccaf2e9a',
        name: 'July 2019',
      },
    ];

    disputesApi.get = jest.fn(() => Promise.resolve({ data }));

    const response = await getFiscalPeriods();

    expect(response).toEqual(data);
    expect(disputesApi.get).toHaveBeenCalledWith('/order/fiscalperiod');
  });
});
