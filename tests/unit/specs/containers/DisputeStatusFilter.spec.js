import DisputeStatusFilter from '@/containers/DisputeStatusFilter';

describe('DisputeStatusFilter', () => {
  describe('computed', () => {
    describe('disputeStatusList', () => {
      it('should return array', () => {
        const filterName = 'disputeStatus';
        const options = [1, 2, 3];
        const mockedThis = {
          filterName,
          [filterName]: options,
        };

        const result = DisputeStatusFilter.computed.disputeStatusList.call(mockedThis);

        expect(result).toEqual(options);
      });
    });
  });
});
