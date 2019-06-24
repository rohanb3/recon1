import i18n from '@/i18n';
import * as validators from '@/services/validators';

describe('validators', () => {
  describe('validateFieldCantBeEmpty', () => {
    it('should return true if pass value', () => {
      const text = 'qwerty';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateFieldCantBeEmpty();
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if not to pass value', () => {
      const text = '';
      const defaultMessage = 'field.cant.be.empty';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateFieldCantBeEmpty();
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage);
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if not to pass value', () => {
      const text = '';
      const customMessage = 'field.must.be.filled';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateFieldCantBeEmpty(customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage);
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateMaxTextLength', () => {
    it('should return true if pass a string of correct length', () => {
      const text = 'qwerty';
      const maxTextLength = 7;

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateMaxTextLength(maxTextLength);
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if pass a string of incorrect length', () => {
      const text = 'qwertyqwertyuiop';
      const maxTextLength = 7;
      const defaultMessage = 'field.max.length';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateMaxTextLength(maxTextLength);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage, {
        length: maxTextLength,
      });
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if pass a string of incorrect length', () => {
      const text = 'qwertyqwertyuiop';
      const maxTextLength = 7;
      const customMessage = 'line.length.exceeded';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateMaxTextLength(maxTextLength, customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage, {
        length: maxTextLength,
      });
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateMinTextLength', () => {
    it('should return true if pass a string of correct length', () => {
      const text = 'qwerty';
      const minTextLength = 3;

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateMinTextLength(minTextLength);
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if pass a string of incorrect length', () => {
      const text = 'qw';
      const minTextLength = 3;
      const defaultMessage = 'field.min.length';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateMinTextLength(minTextLength);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage, {
        length: minTextLength,
      });
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if pass a string of incorrect length', () => {
      const text = 'qw';
      const minTextLength = 3;
      const customMessage = 'string.is.too.short';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateMinTextLength(minTextLength, customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage, {
        length: minTextLength,
      });
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateTextShouldBeLength', () => {
    it('should return true if pass a string of correct length', () => {
      const text = 'qwe';
      const textLength = 3;

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextShouldBeLength(textLength);
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if pass a string of incorrect length', () => {
      const text = 'qw';
      const textLength = 3;
      const defaultMessage = 'field.should.be.length';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextShouldBeLength(textLength);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage, {
        length: textLength,
      });
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if pass a string of incorrect length', () => {
      const text = 'qw';
      const textLength = 3;
      const customMessage = 'line.length.must.be.equal';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextShouldBeLength(textLength, customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage, {
        length: textLength,
      });
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateTextOnlyLettersAndSpaces', () => {
    it('should return true if you pass a valid string', () => {
      const text = 'Hello World';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextOnlyLettersAndSpaces();
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if you pass a not valid string', () => {
      const text = 'Hello World!';
      const defaultMessage = 'field.must.consist.only.letters';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextOnlyLettersAndSpaces();
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage);
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if you pass a not valid string', () => {
      const text = 'Hello World 7';
      const customMessage = 'string.contain.only.letters.and.spaces';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextOnlyLettersAndSpaces(customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage);
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateTextOnlyLettersAndDelimiters', () => {
    it('should return true if you pass a valid string', () => {
      const text = 'Hello - World.';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextOnlyLettersAndDelimiters();
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if you pass a not valid string', () => {
      const text = 'Hello, World';
      const defaultMessage = 'field.must.consist.only.letters';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextOnlyLettersAndDelimiters();
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage);
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if you pass a not valid string', () => {
      const text = 'Hello World 7';
      const customMessage = 'string.contain.only.letters.and.spaces';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateTextOnlyLettersAndDelimiters(customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage);
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateOnlyDigits', () => {
    it('should return true if you pass a valid number', () => {
      const number = 678;

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateOnlyDigits();
      const validationResult = validationFunc(number);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if not pass the number', () => {
      const number = 'seven';
      const defaultMessage = 'field.must.consist.only.digits';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateOnlyDigits();
      const validationResult = validationFunc(number);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage);
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if not pass the number', () => {
      const text = '6 78';
      const customMessage = 'field.must.consist.of.numbers.only';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateOnlyDigits(customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage);
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateEmail', () => {
    it('should return true if you pass a valid email', () => {
      const email = 'example@example.com';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateEmail();
      const validationResult = validationFunc(email);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return true if you pass a valid email', () => {
      const email = 'example.example@example.com';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateEmail();
      const validationResult = validationFunc(email);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return true if you pass a valid email', () => {
      const email = 'example-example@example.com';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateEmail();
      const validationResult = validationFunc(email);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return true if you pass a valid email', () => {
      const email = 'example-example@i.ua';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateEmail();
      const validationResult = validationFunc(email);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if not valid email', () => {
      const email = 'example-example.ua';
      const defaultMessage = 'email.should.be.valid';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateEmail();
      const validationResult = validationFunc(email);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage);
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if not valid email', () => {
      const email = 'example@example';
      const customMessage = 'invalid.email';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateEmail(customMessage);
      const validationResult = validationFunc(email);

      expect(i18n.t).toHaveBeenCalledWith(customMessage);
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateOnlyCapitalLetter', () => {
    it('should return true if you pass a valid string', () => {
      const text = 'Hello';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateOnlyCapitalLetter();
      const validationResult = validationFunc(text);

      expect(i18n.t).not.toHaveBeenCalled();
      expect(validationResult).toEqual(true);
    });

    it('should return the message by default if you pass a not valid string', () => {
      const text = 'hello world';
      const defaultMessage = 'field.must.consist.only.capital.letter';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateOnlyCapitalLetter();
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(defaultMessage);
      expect(validationResult).toEqual(defaultMessage);
    });

    it('should return a custom message if you pass a not valid string', () => {
      const text = 'hello';
      const customMessage = 'must.contain.only.capital.letters';

      i18n.t = jest.fn(message => message);
      const validationFunc = validators.validateOnlyCapitalLetter(customMessage);
      const validationResult = validationFunc(text);

      expect(i18n.t).toHaveBeenCalledWith(customMessage);
      expect(validationResult).toEqual(customMessage);
    });
  });

  describe('validateTextShouldBeEqual', () => {
    it('should return true if you pass a two equal string', () => {
      const text1 = 'Qwerty';
      const text2 = 'Qwerty';

      const validationFunc = validators.validateTextShouldBeEqual(text1, text2);
      const validationResult = validationFunc();
      expect(validationResult).toEqual(true);
    });

    it('should return the message if you pass a two not equal string', () => {
      const text1 = 'Qwerty';
      const text2 = 'Qwertyu';
      const message = 'string.must.be.equal';

      const validationFunc = validators.validateTextShouldBeEqual(text1, text2, message);
      const validationResult = validationFunc();
      expect(validationResult).toEqual(message);
    });
  });
});
