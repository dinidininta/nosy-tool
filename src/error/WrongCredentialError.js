import error from 'http-error';

const { NotFound } = error;

export default class WrongCredentialError extends NotFound {
  constructor() {
    super('Username atau Password salah');
  }
}
