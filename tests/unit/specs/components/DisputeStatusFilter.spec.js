import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import { APPLY_DISPUTE_STATUS_FILTER } from '@/store/tables/actionTypes';

describe('DisputeStatusFilter: ', () => {
  describe('methods.selectedStatusIds: ', () => {
    it('should return array of numbers if passed array of objects', () => {
      const selectedItems = [{ id: [1, 2, 4], name: 'Alabama' }, { id: [4, 6, 9], name: 'Alaska' }];
      const mockedThis = {
        sendFieldName: 'id',
      };

      const result = DisputeStatusFilter.methods.selectedStatusIds.call(mockedThis, selectedItems);

      expect(result).toEqual([1, 2, 4, 6, 9]);
    });
  });

  describe('methods.doApplyFilter: ', () => {
    it('should call action APPLY_DISPUTE_STATUS_FILTER if passed array of objects', () => {
      const selectedItems = [{ id: [1, 2, 4], name: 'Alabama' }, { id: [4, 6, 9], name: 'Alaska' }];
      const mockedThis = {
        tableName: 'some_type',
        dependentFilterName: 'xyz',
        filterName: 'spectrum',
        selectedStatusIds: jest.fn(),
        $store: { dispatch: jest.fn() },
      };

      DisputeStatusFilter.methods.doApplyFilter.call(mockedThis, selectedItems);

      const expectedData = {
        dependentFilterName: 'xyz',
        selectedFilter: { name: 'spectrum', value: undefined },
        tableName: 'some_type',
      };

      expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(
        APPLY_DISPUTE_STATUS_FILTER,
        expectedData
      );
    });

    it('should call action APPLY_DISPUTE_STATUS_FILTER if passed array of objects', () => {
      const selectedItems = [{ id: [1, 2, 4], name: 'Alabama' }, { id: [4, 6, 9], name: 'Alaska' }];
      const mockedThis = {
        tableName: 'some_type',
        dependentFilterName: 'xyz',
        filterName: 'spectrum',
        selectedStatusIds: jest.fn(),
        $store: { dispatch: jest.fn() },
      };

      DisputeStatusFilter.methods.doApplyFilter.call(mockedThis, selectedItems);

      expect(mockedThis.selectedStatusIds).toHaveBeenCalledWith(selectedItems);
    });
  });
});
