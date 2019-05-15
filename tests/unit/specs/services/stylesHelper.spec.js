import { inverseColor, getRandomColor } from '@/services/stylesHelper';

describe('stylesHelper', () => {
  describe('getRandomColor', () => {
    it('should return hex color', () => {
      const result = getRandomColor();
      const hexPattern = /#[A-Fa-f0-9]{6}/;

      expect(result).toMatch(hexPattern);
    });
  });

  describe('inverseColor', () => {
    it('should return inversed color', () => {
      const result = inverseColor('#ffffff');
      expect(result).toEqual('#000000');
    });

    it('should return inversed color if passed short hex color', () => {
      const newColor = inverseColor('#fba');
      const sourceColor = inverseColor(newColor);

      expect(sourceColor).toEqual('#ffbbaa');
      expect(newColor).toEqual('#004455');
    });

    it('should return default color if no data passed', () => {
      const result = inverseColor();
      expect(result).toEqual('#ffffff');
    });

    it('should return default color if incorrect data passed', () => {
      const result = inverseColor('lol');
      expect(result).toEqual('#ffffff');
    });
  });
});
