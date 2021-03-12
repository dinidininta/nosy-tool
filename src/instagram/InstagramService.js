import Instagram from 'instagram-web-api';

const { IG_USERNAME, IG_PASSWORD } = process.env;

export default class InstagramService {
  constructor() {
    this._client = new Instagram({ username: IG_USERNAME, password: IG_PASSWORD });
  }

  async getProfile() {
    const { authenticated } = await this._client.login();
    if (!authenticated) {
      return {
        message: 'Username atau Password salah'
      };
    }
    return this._client.getProfile();
  }
}
