import { InvalidParamError } from '../../errors/invalid-param-error copy';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, serverError, ok } from '../../helpers/http-helper';
import {
  type EmailValidator,
  type AddAccount,
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from './signup-protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, name, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
      const account = await this.addAccount.add({
        email,
        name,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
