import TableButton from '@/components/TableButton';

describe('TableButton: ', () => {
  describe('methods: ', () => {
    describe('onClick: ', () => {
      it('should call event click if property disabled equal false', () => {
        const mockedThis = {
          $emit: jest.fn(),
          disabled: false,
        };

        TableButton.methods.onClick.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('click');
      });

      it('should not call event click if property disabled equal true', () => {
        const mockedThis = {
          $emit: jest.fn(),
          disabled: true,
        };

        TableButton.methods.onClick.call(mockedThis);

        expect(mockedThis.$emit).not.toHaveBeenCalledWith('click');
      });
    });
  });
});
