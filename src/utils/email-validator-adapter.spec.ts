import { EmailValidatorAdapter } from './email-validator';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('EmailValidator Adapter', () => {
  const invalidEmail = 'invalid_email';
  const validEmail = 'valid_email@email.com';
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid(invalidEmail);
    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid(validEmail);
    expect(isValid).toBe(true);
  });
});
