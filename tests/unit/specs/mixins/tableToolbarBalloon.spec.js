import * as sinon from 'sinon';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';

describe('tableToolbarBalloon', () => {
  describe('tableToolbarBalloon: computed', () => {
    describe('options', () => {
      it('should return options', () => {
        const expectedResult = {
          modifiers: {
            preventOverflow: { boundariesElement: 'scrollParent' },
            placement: 'bottom',
          },
        };

        const result = tableToolbarBalloon.computed.options.call(null);

        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe('tableToolbarBalloon: methods', () => {
    describe('checkAndShow', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should call func show with timeout', () => {
        const DELAY_BEFORE_OPENING = 10;
        const mockedThis = {
          show: jest.fn(),
          isShown: false,
        };

        tableToolbarBalloon.methods.checkAndShow.call(mockedThis);

        expect(mockedThis.show).toHaveBeenCalledTimes(0);

        clock.tick(DELAY_BEFORE_OPENING);
        expect(mockedThis.show).toHaveBeenCalledTimes(1);
      });
    });
    describe('checkAndHide', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should call func hide with timeout', () => {
        const DELAY_BEFORE_OPENING = 10;
        const mockedThis = {
          hide: jest.fn(),
          isShown: true,
        };

        tableToolbarBalloon.methods.checkAndHide.call(mockedThis);

        expect(mockedThis.hide).toHaveBeenCalledTimes(0);

        clock.tick(DELAY_BEFORE_OPENING);
        expect(mockedThis.hide).toHaveBeenCalledTimes(1);
      });
    });
    describe('show', () => {
      it('should call doShow func', () => {
        const mockedThis = {
          $refs: {
            popper: {
              doShow: jest.fn(),
            },
          },
        };

        tableToolbarBalloon.methods.show.call(mockedThis);

        expect(mockedThis.$refs.popper.doShow).toHaveBeenCalled();
      });
    });
    describe('hide', () => {
      it('should call doClose func', () => {
        const mockedThis = {
          $refs: {
            popper: {
              doClose: jest.fn(),
            },
          },
        };

        tableToolbarBalloon.methods.hide.call(mockedThis);

        expect(mockedThis.$refs.popper.doClose).toHaveBeenCalled();
      });
    });
    describe('onShow', () => {
      it('should change isShown status', () => {
        const mockedThis = {
          isShown: false,
        };

        tableToolbarBalloon.methods.onShow.call(mockedThis);

        expect(mockedThis.isShown).toEqual(true);
      });
    });
    describe('onHide', () => {
      it('should change isShown status', () => {
        const mockedThis = {
          isShown: true,
        };

        tableToolbarBalloon.methods.onHide.call(mockedThis);

        expect(mockedThis.isShown).toEqual(false);
      });
    });
  });
});
