import { sleep, pushIntoArray } from '../tools/ServerTool';

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

  async _getFollowings(userId, after = null) {
    return this._client.getFollowings({ userId, after });
  }

  async collectFollowingsNames(userId, verifiedAccOnly, names = [], endCursor = null) {
    const action = `fetching following of user ${userId}`;
    console.log(`${action}...`);
    const { page_info: pageInfo, data } = await this._getFollowings(userId, endCursor);
    const { has_next_page: hasNextPage, end_cursor: fetchedEndCursor } = pageInfo;
    pushIntoArray(data, names, 'username', 'is_verified', verifiedAccOnly);
    if (hasNextPage) {
      sleep(3000);
      await this.collectFollowingsNames(userId, verifiedAccOnly, names, fetchedEndCursor);
    }
  }
}
