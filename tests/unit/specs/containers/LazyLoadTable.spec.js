import LazyLoadTable from '@/containers/LazyLoadTable';

describe('LazyLoadTable', () => {
  describe('props', () => {
    describe('rows', () => {
      it('should return empty array', () => {
        const result = LazyLoadTable.props.rows.default();
        expect(result).toEqual([]);
      });
    });

    describe('columns', () => {
      it('should return empty array', () => {
        const result = LazyLoadTable.props.columns.default();
        expect(result).toEqual([]);
      });
    });
  });
});
