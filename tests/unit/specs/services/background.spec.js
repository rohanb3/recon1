import {
  addBackgroundBlur,
  removeBackgroundBlur,
  addBackgroundShadow,
  removeBackgroundShadow,
} from '@/services/background';

describe('background', () => {
  describe('addBackgroundBlur', () => {
    it('should call method querySelector with parameter', () => {
      document.querySelector = jest.fn();

      addBackgroundBlur();

      expect(document.querySelector).toHaveBeenCalledWith('.application--wrap');
    });

    it('should call method add with parameter', () => {
      const classList = { add: jest.fn() };
      document.querySelector = jest.fn(() => ({ classList }));

      addBackgroundBlur();

      expect(classList.add).toHaveBeenCalledWith('blurred');
    });
  });

  describe('removeBackgroundBlur', () => {
    it('should call method querySelector with parameter', () => {
      document.querySelector = jest.fn();

      removeBackgroundBlur();

      expect(document.querySelector).toHaveBeenCalledWith('.application--wrap');
    });

    it('should call method add with parameter', () => {
      const classList = { remove: jest.fn() };
      document.querySelector = jest.fn(() => ({ classList }));

      removeBackgroundBlur();

      expect(classList.remove).toHaveBeenCalledWith('blurred');
    });
  });

  describe('addBackgroundShadow', () => {
    it('should call method querySelector with parameter', () => {
      document.querySelector = jest.fn();

      addBackgroundShadow();

      expect(document.querySelector).toHaveBeenCalledWith('.application--wrap');
    });

    it('should call method add with parameter', () => {
      const classList = { add: jest.fn() };
      document.querySelector = jest.fn(() => ({ classList }));

      addBackgroundShadow();

      expect(classList.add).toHaveBeenCalledWith('shadow-overlay');
    });
  });

  describe('removeBackgroundShadow', () => {
    it('should call method querySelector with parameter', () => {
      document.querySelector = jest.fn();

      removeBackgroundShadow();

      expect(document.querySelector).toHaveBeenCalledWith('.application--wrap');
    });

    it('should call method add with parameter', () => {
      const classList = { remove: jest.fn() };
      document.querySelector = jest.fn(() => ({ classList }));

      removeBackgroundShadow();

      expect(classList.remove).toHaveBeenCalledWith('shadow-overlay');
    });
  });
});
