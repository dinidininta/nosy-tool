import error from 'http-error';

const { NotFound } = error;

export default class FeatureMissingError extends NotFound {
  constructor() {
    super('some text here..');
  }
}
