import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';

const DELAY_BEFORE_OPENING = 10;

describe('tableToolbarBalloon: ', () => {
  describe('computed: ', () => {
    describe('options: ', () => {
      it('should return object', () => {
        const result = tableToolbarBalloon.computed.options();

        const expectedResult = {
          modifiers: {
            preventOverflow: { boundariesElement: 'scrollParent' },
            placement: 'bottom',
          },
        };

        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('methods: ', () => {
    describe('checkAndShow: ', () => {
      it('should call setTimeout with parameters if defined isShown as false', () => {
        const mockedThis = {
          isShown: false,
          show: jest.fn(),
        };

        window.setTimeout = jest.fn();

        tableToolbarBalloon.methods.checkAndShow.call(mockedThis);

        expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), DELAY_BEFORE_OPENING);
      });

      it('should not call setTimeout if defined isShown as true', () => {
        const mockedThis = {
          isShown: true,
          show: jest.fn(),
        };

        window.setTimeout = jest.fn();

        tableToolbarBalloon.methods.checkAndShow.call(mockedThis);

        expect(window.setTimeout).not.toHaveBeenCalled();
      });
    });

    describe('checkAndHide: ', () => {
      it('should call setTimeout with parameters if defined isShown as true', () => {
        const mockedThis = {
          isShown: true,
          hide: jest.fn(),
        };

        window.setTimeout = jest.fn();

        tableToolbarBalloon.methods.checkAndHide.call(mockedThis);

        expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), DELAY_BEFORE_OPENING);
      });

      it('should not call setTimeout if defined isShown as false', () => {
        const mockedThis = {
          isShown: false,
          hide: jest.fn(),
        };

        window.setTimeout = jest.fn();

        tableToolbarBalloon.methods.checkAndHide.call(mockedThis);

        expect(window.setTimeout).not.toHaveBeenCalled();
      });
    });

    describe('show: ', () => {
      it('should call doShow', () => {
        const mockedThis = {
          $refs: { popper: { doShow: jest.fn() } },
        };

        tableToolbarBalloon.methods.show.call(mockedThis);

        expect(mockedThis.$refs.popper.doShow).toHaveBeenCalled();
      });
    });

    describe('hide: ', () => {
      it('should call doClose', () => {
        const mockedThis = {
          $refs: { popper: { doClose: jest.fn() } },
        };

        tableToolbarBalloon.methods.hide.call(mockedThis);

        expect(mockedThis.$refs.popper.doClose).toHaveBeenCalled();
      });
    });

    describe('onShow: ', () => {
      it('should set true for property isShown', () => {
        const mockedThis = {
          isShown: null,
        };

        tableToolbarBalloon.methods.onShow.call(mockedThis);

        expect(mockedThis.isShown).toBeTruthy();
      });
    });

    describe('onHide: ', () => {
      it('should set false for property isShown', () => {
        const mockedThis = {
          isShown: null,
        };

        tableToolbarBalloon.methods.onHide.call(mockedThis);

        expect(mockedThis.isShown).toBeFalsy();
      });
    });
  });
});
