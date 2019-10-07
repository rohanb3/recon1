import { process } from '../../utils/styleImportMock';

describe('styleImportMock', () => {
  describe('process', () => {
    it('should return empty string', () => {
      const result = process();

      expect(result).toEqual('');
    });
  });
});
