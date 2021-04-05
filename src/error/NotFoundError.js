import error from 'http-error';

const { NotFound } = error;

export default class NotFoundError extends NotFound {
  constructor(item) {
    super(`${item} tidak ditemukan.`);
  }
}
