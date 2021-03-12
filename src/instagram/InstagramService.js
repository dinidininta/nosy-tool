export default class InstagramService {
  constructor(locals) {
    const { client } = locals;
    this._client = client;
  }

  async getProfile() {
    return this._client.getProfile();
  }
}
