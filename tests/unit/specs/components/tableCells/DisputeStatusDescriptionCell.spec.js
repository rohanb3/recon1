import DisputeStatusDescriptionCell from '@/components/tableCells/DisputeStatusDescriptionCell';

describe('DisputeStatusDescriptionCell: ', () => {
  describe('computed: ', () => {
    describe('disputeComment: ', () => {
      it('should return dispute comment', () => {
        const mockedThis = {
          item: {
            submitterComment: 'test comment',
          },
        };

        const result = DisputeStatusDescriptionCell.computed.disputeComment.call(mockedThis);

        expect(result).toEqual(mockedThis.item.submitterComment);
      });

      it('should return dispute status description if submitterComment not defined', () => {
        const mockedThis = {
          item: {
            disputeStatusDescription: 'test comment',
          },
        };

        const result = DisputeStatusDescriptionCell.computed.disputeComment.call(mockedThis);

        expect(result).toEqual(mockedThis.item.disputeStatusDescription);
      });
    });
  });
});
