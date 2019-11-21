/**
 * Representing a service ...
 */

export default class SomeFeatureService {
  constructor(models) {
    this._models = models;
  }

  async borrowBook(someParameter) {
    const { SomeFeature } = this._models;
    const foundedFeature = SomeFeature.checkExist(someParameter);
    return foundedFeature;
  }
}
