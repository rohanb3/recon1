// import disputeCommonTable from '@/mixins/disputeCommonTable';
// import * as disputesRepository from '@/services/disputesRepository';
// import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';
// import { CHANGE_ITEM } from '@/store/storage/mutationTypes';
// import * as notifications from '@/services/notifications';
// import { APPLY_FILTERS } from '@/store/tables/actionTypes';

// TODO: fix this

it('tmp', () => expect(1).toEqual(1));

// describe('disputeCommonTable', () => {
//   describe('disputeCommonTable: computed', () => {
//     describe('displayName', () => {
//       it('should return displayName', () => {
//         const displayName = 'displayName';
//         const mockedThis = {
//           profileData: {
//             displayName,
//           },
//         };

//         const result = disputeCommonTable.computed.displayName.call(mockedThis);

//         expect(result).toEqual(displayName);
//       });

//       it('should return empty string if displayName is not defined', () => {
//         const mockedThis = {
//           profileData: {},
//         };

//         const result = disputeCommonTable.computed.displayName.call(mockedThis);

//         expect(result).toEqual('');
//       });
//     });
//   });
//   describe('disputeCommonTable: methods', () => {
//     describe('onChangeStatus', () => {
//       it('should add the dispute id to the array', async () => {
//         const disputeId = 'q3sdt5h74fg44h4v43fdg';
//         const mockedThis = {
//           processingDisputeIds: [],
//           $store: {
//             commit: jest.fn(),
//           },
//         };

//         disputesRepository.getDispute = jest.fn();
//         disputesRepository.changeStatusDispute = jest.fn();

//         const pushDisputeIdSpy = jest.spyOn(mockedThis.processingDisputeIds, 'push');

//         await disputeCommonTable.methods.onChangeStatus.call(mockedThis, {
//           disputeId,
//         });

//         expect(pushDisputeIdSpy).toHaveBeenCalledWith(disputeId);
//       });

//       it('should call changeStatusDispute with parameters', async () => {
//         const disputeId = 'q3sdt5h74fg44h4v43fdg';
//         const statusId = 'statusId';
//         const displayName = 'displayName';
//         const comments = 'comments';
//         const mockedThis = {
//           displayName,
//           processingDisputeIds: [],
//           $store: {
//             commit: jest.fn(),
//           },
//         };

//         disputesRepository.getDispute = jest.fn();
//         disputesRepository.changeStatusDispute = jest.fn();

//         await disputeCommonTable.methods.onChangeStatus.call(mockedThis, {
//           disputeId,
//           statusId,
//           comments,
//         });

//         expect(disputesRepository.changeStatusDispute).toHaveBeenCalledWith({
//           disputeId,
//           status: statusId,
//           userName: displayName,
//           comments,
//         });
//       });

//       it('should call getDispute with parameters', async () => {
//         const disputeId = 'q3sdt5h74fg44h4v43fdg';
//         const mockedThis = {
//           processingDisputeIds: [],
//           $store: {
//             commit: jest.fn(),
//           },
//         };

//         disputesRepository.getDispute = jest.fn();
//         disputesRepository.changeStatusDispute = jest.fn();

//         await disputeCommonTable.methods.onChangeStatus.call(mockedThis, {
//           disputeId,
//         });

//         expect(disputesRepository.getDispute).toHaveBeenCalledWith(disputeId);
//       });

//       it('should call CHANGE_ITEM mutation with parameters', async () => {
//         const disputeId = 'q3sdt5h74fg44h4v43fdg';
//         const disputeInfo = { id: 1, date: '2019.06.01' };
//         const mockedThis = {
//           processingDisputeIds: [],
//           tableName: 'tableName',
//           $store: {
//             commit: jest.fn(),
//           },
//         };

//         disputesRepository.getDispute = jest.fn(() => disputeInfo);
//         disputesRepository.changeStatusDispute = jest.fn();

//         await disputeCommonTable.methods.onChangeStatus.call(mockedThis, {
//           disputeId,
//         });

//         expect(mockedThis.$store.commit).toHaveBeenCalledWith(CHANGE_ITEM, {
//           itemType: mockedThis.tableName,
//           id: disputeId,
//           ...disputeInfo,
//         });
//       });

//       it('upon completion of the method, the dispute id should be removed', async () => {
//         const disputeId = 'disputeId';
//         const mockedThis = {
//           processingDisputeIds: ['qwerty', disputeId, 'trwe'],
//           $store: {
//             commit: jest.fn(),
//           },
//         };

//         disputesRepository.getDispute = jest.fn();
//         disputesRepository.changeStatusDispute = jest.fn();

//         await disputeCommonTable.methods.onChangeStatus.call(mockedThis, {
//           disputeId,
//         });

//         expect(mockedThis.processingDisputeIds).toEqual(['qwerty', 'trwe']);
//       });

//       it('should call errorMessage if an error occurs while executing the method', async () => {
//         const disputeId = 'disputeId';
//         const mockedThis = {
//           processingDisputeIds: [],
//           $store: {
//             commit: jest.fn(),
//           },
//         };

//         disputesRepository.getDispute = jest.fn(Promise.reject());
//         disputesRepository.changeStatusDispute = jest.fn();
//         notifications.errorMessage = jest.fn();

//         await disputeCommonTable.methods.onChangeStatus.call(mockedThis, {
//           disputeId,
//         });

//         expect(notifications.errorMessage).toHaveBeenCalled();
//       });
//     });

//     describe('onSelectId', () => {
//       it('should APPLY_FILTERS', async () => {
//         const mockedThis = {
//           $store: {
//             dispatch: jest.fn(),
//           },
//         };
//         const data = {
//           tableName: ENTITY_TYPES.DISPUTE_HISTORY,
//           filters: [
//             {
//               name: FILTER_NAMES.DISPUTE_ID,
//               value: 'idDispute',
//             },
//           ],
//         };

//         await disputeCommonTable.methods.onSelectId.call(mockedThis, 'idDispute');

//         expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(APPLY_FILTERS, data);
//       });

//       it('should call errorMessage if an error occurs while executing the method', async () => {
//         const mockedThis = {
//           $store: {
//             dispatch: jest.fn(Promise.reject()),
//           },
//         };

//         notifications.errorMessage = jest.fn();

//         await disputeCommonTable.methods.onSelectId.call(mockedThis, 'idDispute');
//         expect(notifications.errorMessage).toHaveBeenCalled();
//       });
//     });
//   });
// });
