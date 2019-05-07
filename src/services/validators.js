import i18n from '@/i18n';

const ONLY_DIGITS_REGEX = /^[\d]+$/;
const ONLY_LETTERS_AND_SPACES_REGEX = /^[a-zA-Z ]+$/;
const ONLY_LETTERS_AND_DELIMITERS_REGEX = /^[a-zA-Z- .]+$/;

export const validateFieldCantBeEmpty = (message = 'field.cant.be.empty') => {
  return text => !!text || i18n.t(message);
};

export const validateMaxTextLength = (maxLength, message = 'field.max.length') => {
  return text =>
    String(text).length <= maxLength ||
    i18n.t(message, {
      length: maxLength,
    });
};

export const validateTextOnlyLettersAndSpaces = (message = 'field.must.consist.only.letters') => {
  return text => ONLY_LETTERS_AND_SPACES_REGEX.test(text) || i18n.t(message);
};

export const validateTextOnlyLettersAndDelimiters = (
  message = 'field.must.consist.only.letters'
) => {
  return text => ONLY_LETTERS_AND_DELIMITERS_REGEX.test(text) || i18n.t(message);
};

export const validateOnlyDigits = (message = 'field.must.consist.only.digits') => {
  return number => ONLY_DIGITS_REGEX.test(number) || i18n.t(message);
};
