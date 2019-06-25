import transformDataFromResponse from '@/services/disputesBySubmitters/transformDataFromResponse';
import { DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES } from '@/constants';

describe('transformDataFromResponse', () => {
  it('should return object if passed correct data', () => {
    const byApprove = {
      id: 2,
      topBy: DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES.BY_APPROVE,
    };

    const byRejection = {
      id: 3,
      topBy: DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES.BY_REJECTION,
    };

    const fakeData = [
      {
        id: 1,
        topBy: 123,
      },
      { ...byApprove },
      { ...byRejection },
    ];

    const result = transformDataFromResponse(fakeData);

    const expectedData = {
      byApprove,
      byRejection,
    };

    expect(result).toEqual(expectedData);
  });

  it('should return object with undefined value if passed incorrect data', () => {
    const fakeData = [
      {
        id: 1,
        topBy: 123,
      },
    ];

    const result = transformDataFromResponse(fakeData);

    const expectedData = {
      byApprove: undefined,
      byRejection: undefined,
    };

    expect(result).toEqual(expectedData);
  });
});
