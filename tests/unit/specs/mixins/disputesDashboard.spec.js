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
      it('should return object if such a sectionName exists', () => {
        const mockedThis = {
          parseStatistics: jest.fn(data => data),
          statistics: [{ sectionName: 'sectionName' }, { sectionName: 'sectionName2' }],
        };
        const sectionName = 'sectionName';

        const result = disputesDashboard.methods.getSection.call(mockedThis, sectionName);

        const expectedResult = { sectionName: 'sectionName' };
        expect(result).toEqual(expectedResult);
      });

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
  describe('disputesDashboard: methods', () => {
    describe('parseStatistics', () => {
      it('should return formatted object with statistics if passed object with statistics', () => {
        const statistics = {
          sectionName: 'qwerty',
          data: {
            total: 50,
            rows: {
              Percent: 55,
              Commission: 70,
            },
          },
        };

        const result = disputesDashboard.methods.parseStatistics(statistics);

        const expectedResult = {
          commission: 70,
          percent: 55,
          sectionName: 'qwerty',
          totalQuantity: 50,
        };
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
