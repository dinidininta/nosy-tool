export default class InstagramService {
  constructor(locals) {
    const { client } = locals;
    this._client = client;
  }

  async getProfile() {
    return this._client.getProfile();
  }

  async getUserByUsername(data) {
    const { username } = data;
    return this._client.getUserByUsername({ username });
  }
}
