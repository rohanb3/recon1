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
