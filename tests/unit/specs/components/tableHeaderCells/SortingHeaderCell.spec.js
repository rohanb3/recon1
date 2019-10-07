import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import { SORTING_DIRECTION } from '@/constants';

describe('SortingHeaderCell: ', () => {
  describe('props: ', () => {
    describe('sortingField: ', () => {
      it('should return true if value is string', () => {
        const result = SortingHeaderCell.props.sortingField.validator('text');

        expect(result).toBeTruthy();
      });

      it('should return true if value is null', () => {
        const result = SortingHeaderCell.props.sortingField.validator(null);

        expect(result).toBeTruthy();
      });

      it('should return false if value is not string or null', () => {
        const result = SortingHeaderCell.props.sortingField.validator(132);

        expect(result).toBeFalsy();
      });
    });

    describe('sortDirection: ', () => {
      it('should return true if value is desc direction', () => {
        const result = SortingHeaderCell.props.sortDirection.validator(SORTING_DIRECTION.DESC);

        expect(result).toBeTruthy();
      });

      it('should return true if value is asc direction', () => {
        const result = SortingHeaderCell.props.sortDirection.validator(SORTING_DIRECTION.ASC);

        expect(result).toBeTruthy();
      });

      it('should return true if value is null', () => {
        const result = SortingHeaderCell.props.sortDirection.validator(null);

        expect(result).toBeTruthy();
      });

      it('should return false if value is not included in the set', () => {
        const result = SortingHeaderCell.props.sortDirection.validator(123);

        expect(result).toBeFalsy();
      });
    });
  });

  describe('computed: ', () => {
    describe('arrowDirection: ', () => {
      it('should return true if sorting performed on the current column and direction is asc', () => {
        const mockedThis = {
          sortingField: 'ageField',
          sortDirection: SORTING_DIRECTION.ASC,
          column: {
            sortingFieldName: 'ageField',
          },
        };

        const result = SortingHeaderCell.computed.arrowDirection.call(mockedThis);

        expect(result).toBeTruthy();
      });

      it('should return false if sorting performed on the current column and direction is not asc', () => {
        const mockedThis = {
          sortingField: 'ageField',
          sortDirection: SORTING_DIRECTION.DESC,
          column: {
            sortingFieldName: 'ageField',
          },
        };

        const result = SortingHeaderCell.computed.arrowDirection.call(mockedThis);

        expect(result).toBeFalsy();
      });

      it('should return null if sorting performed on another column', () => {
        const mockedThis = {
          sortingField: 'ageField',
          sortDirection: SORTING_DIRECTION.DESC,
          column: {
            sortingFieldName: 'stateField',
          },
        };

        const result = SortingHeaderCell.computed.arrowDirection.call(mockedThis);

        expect(result).toBeNull();
      });
    });
  });

  describe('methods: ', () => {
    describe('onClickSortingHeaderCell: ', () => {
      it('should call event sortDirectionChanged with parameter', () => {
        const sortingFieldName = 'qwerty';
        const mockedThis = {
          $emit: jest.fn(),
          column: {
            sortingFieldName,
          },
        };

        SortingHeaderCell.methods.onClickSortingHeaderCell.call(mockedThis);

        expect(mockedThis.$emit).toHaveBeenCalledWith('sortDirectionChanged', sortingFieldName);
      });
    });
  });
});
