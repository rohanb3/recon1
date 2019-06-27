import disputesDashboard from '@/mixins/disputesDashboard';

const SECTION_TOTAL_DISPUTES = 'Total Disputes';

describe('disputesDashboard', () => {
  describe('disputesDashboard: computed', () => {
    describe('totalStatistics', () => {
      it('should call getSection with right params', () => {
        const mockedThis = {
          getSection: jest.fn(),
        };

        disputesDashboard.computed.totalStatistics.call(mockedThis);

        expect(mockedThis.getSection).toHaveBeenCalledWith(SECTION_TOTAL_DISPUTES);
      });
    });
  });
  describe('disputesDashboard: methods', () => {
    describe('getSection', () => {
      it('should call parseStatistics func', () => {
        const mockedThis = {
          parseStatistics: jest.fn(),
          statistics: [],
        };
        const sectionName = 'sectionName';

        disputesDashboard.methods.getSection.call(mockedThis, sectionName);

        expect(mockedThis.parseStatistics).toHaveBeenCalled();
      });
    });
  });
});
