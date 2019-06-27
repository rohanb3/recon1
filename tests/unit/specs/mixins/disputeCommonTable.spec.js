import disputeCommonTable from '@/mixins/disputeCommonTable';
import * as disputesRepository from '@/services/disputesRepository';
import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';

describe('disputeCommonTable', () => {
  describe('disputeCommonTable: computed', () => {
    describe('displayName', () => {
      it('should return displayName', () => {
        const displayName = 'displayName';
        const mockedThis = {
          profileData: {
            displayName,
          },
        };

        const result = disputeCommonTable.computed.displayName.call(mockedThis);

        expect(result).toEqual(displayName);
      });
    });
  });
  describe('disputeCommonTable: methods', () => {
    describe('onChangeDisputeStatus', () => {
      it('should call changeStatusDispute, getDispute, $store.commit', async () => {
        const CHANGE_ITEM = 'CHANGE_ITEM';
        const displayName = 'displayName';
        const disputeId = 'disputeId';
        const statusId = 'statusId';
        const comments = 'comments';

        const mockedThis = {
          displayName,
          tableName: 'tableName',
          $store: {
            commit: jest.fn(),
          },
        };

        disputesRepository.getDispute = jest.fn();
        disputesRepository.changeStatusDispute = jest.fn();

        await disputeCommonTable.methods.onChangeDisputeStatus.call(mockedThis, {
          disputeId,
          statusId,
          comments,
        });

        expect(disputesRepository.changeStatusDispute).toHaveBeenCalledWith({
          disputeId,
          status: statusId,
          userName: displayName,
          comments,
        });

        expect(disputesRepository.getDispute).toHaveBeenCalledWith(disputeId);

        expect(mockedThis.$store.commit).toHaveBeenCalledWith(CHANGE_ITEM, {
          itemType: mockedThis.tableName,
          id: disputeId,
        });
      });
    });
    describe('onSelectIdDispute', () => {
      it('should APPLY_FILTERS', () => {
        const APPLY_FILTERS = 'APPLY_FILTERS';
        const mockedThis = {
          $store: {
            dispatch: jest.fn(),
          },
        };
        const data = {
          tableName: ENTITY_TYPES.DISPUTE_HISTORY,
          filters: [
            {
              name: FILTER_NAMES.DISPUTE_ID,
              value: 'idDispute',
            },
          ],
        };

        disputeCommonTable.methods.onSelectIdDispute.call(mockedThis, 'idDispute');

        expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(APPLY_FILTERS, data);
      });
    });
  });
});
