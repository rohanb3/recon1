import i18n from '@/i18n';

const ONLY_DIGITS_REGEX = /^[\d]+$/;
const ONLY_LETTERS_AND_SPACES_REGEX = /^[a-zA-Z ]+$/;
const ONLY_LETTERS_AND_DELIMITERS_REGEX = /^[a-zA-Z- .]+$/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ONLY_CAPITAL_LETTER_REGEX = /[A-Z]/;

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

export const validateMinTextLength = (minLength, message = 'field.min.length') => {
  return text =>
    String(text).length >= minLength ||
    i18n.t(message, {
      length: minLength,
    });
};

export const validateTextShouldBeLength = (textLength, message = 'field.should.be.length') => {
  return text =>
    String(text).length === textLength ||
    i18n.t(message, {
      length: textLength,
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

export const validateEmail = (message = 'email.should.be.valid') => {
  return email => EMAIL_REGEX.test(email) || i18n.t(message);
};

export const validateOnlyCapitalLetter = (message = 'field.must.consist.only.capital.letter') => {
  return text => ONLY_CAPITAL_LETTER_REGEX.test(text) || i18n.t(message);
};

export const validateTextShouldBeEqual = (text1, text2, message) => {
  return () => text1 === text2 || i18n.t(message);
};
