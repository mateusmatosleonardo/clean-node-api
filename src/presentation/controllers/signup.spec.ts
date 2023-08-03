import { SignUpController } from './signup';
describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpResquest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
