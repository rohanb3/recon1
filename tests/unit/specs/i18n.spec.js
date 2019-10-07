import moment from 'moment';
import { setLang, DEFAULT_LANGUAGE } from '@/i18n';

describe('i18n', () => {
  describe('setLang', () => {
    it('should call method locale with parameter', () => {
      window.localStorage.getItem = jest.fn(() => false);
      const MomentLocaleSpy = jest.spyOn(moment, 'locale');
      const lang = 'de';
      setLang(lang);
      expect(MomentLocaleSpy).toHaveBeenCalledWith(lang);
    });

    it('should call method locale with default parameter', () => {
      window.localStorage.getItem = jest.fn(() => false);
      const MomentLocaleSpy = jest.spyOn(moment, 'locale');
      setLang('jp');
      expect(MomentLocaleSpy).toHaveBeenCalledWith(DEFAULT_LANGUAGE);
    });
  });
});
