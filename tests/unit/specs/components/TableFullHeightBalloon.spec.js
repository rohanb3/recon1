import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';

describe('TableFullHeightBalloon: ', () => {
  describe('mounted: ', () => {
    it('should call method subscribeToClickOut', () => {
      const mockedThis = {
        subscribeToClickOut: jest.fn(),
      };

      TableFullHeightBalloon.mounted.call(mockedThis);

      expect(mockedThis.subscribeToClickOut).toHaveBeenCalled();
    });
  });

  describe('beforeDestroy: ', () => {
    it('should call method unsubscribeFromClickOut', () => {
      const mockedThis = {
        unsubscribeFromClickOut: jest.fn(),
      };

      TableFullHeightBalloon.beforeDestroy.call(mockedThis);

      expect(mockedThis.unsubscribeFromClickOut).toHaveBeenCalled();
    });
  });

  describe('methods: ', () => {
    describe('subscribeToClickOut: ', () => {
      it('should add event listener click', () => {
        const mockedThis = {
          onClick: () => 'func',
        };

        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

        TableFullHeightBalloon.methods.subscribeToClickOut.call(mockedThis);

        expect(addEventListenerSpy).toHaveBeenCalledWith('click', mockedThis.onClick);
      });
    });

    describe('unsubscribeFromClickOut: ', () => {
      it('should remove event listener click', () => {
        const mockedThis = {
          onClick: () => 'func',
        };

        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

        TableFullHeightBalloon.methods.unsubscribeFromClickOut.call(mockedThis);

        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', mockedThis.onClick);
      });
    });

    describe('onClick: ', () => {
      it('should call method close if isClickout true', () => {
        const mockedThis = {
          close: jest.fn(),
        };

        const ev = {
          target: {
            closest: jest.fn(() => false),
          },
        };

        TableFullHeightBalloon.methods.onClick.call(mockedThis, ev);

        expect(ev.target.closest).toHaveBeenCalledWith('.table-full-height-balloon');
        expect(mockedThis.close).toHaveBeenCalled();
      });
    });

    describe('close: ', () => {
      it('should call event close', () => {
        const mockedThis = {
          $emit: jest.fn(),
        };

        TableFullHeightBalloon.methods.close.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('close');
      });
    });
  });
});