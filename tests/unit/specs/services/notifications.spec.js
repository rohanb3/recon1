import Vue from 'vue';
import i18n from '@/i18n';
import { successMessage, warnMessage, errorMessage } from '@/services/notifications';

describe('notifications', () => {
  i18n.t = jest.fn(text => text);
  Vue.notify = jest.fn();

  describe('successMessage', () => {
    it('should call notify with parameter', () => {
      successMessage('some title');

      expect(Vue.notify).toHaveBeenCalledWith({
        group: 'notifications',
        text: '',
        title: 'some title',
        type: 'success',
      });
    });
  });

  describe('warnMessage', () => {
    it('should call notify with parameter', () => {
      warnMessage('some title');

      expect(Vue.notify).toHaveBeenCalledWith({
        group: 'notifications',
        text: '',
        title: 'some title',
        type: 'warn',
      });
    });
  });

  describe('errorMessage', () => {
    it('should call notify with parameter', () => {
      errorMessage();

      expect(Vue.notify).toHaveBeenCalledWith({
        group: 'notifications',
        text: '',
        title: 'something.went.wrong',
        type: 'error',
      });
    });
  });
});
