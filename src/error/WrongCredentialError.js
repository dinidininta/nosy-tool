import error from 'http-error';

const { Unauthorized } = error;

export default class WrongCredentialError extends Unauthorized {
  constructor() {
    super('Username atau Password salah');
  }
}
