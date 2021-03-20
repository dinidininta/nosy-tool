import { sleep, pushIntoArray, getOption } from '../tools/ServerTool';

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

  async _handleError(error, action) {
    const { error: errorBody } = error;
    console.log(`error when ${action}. error: ${JSON.stringify(errorBody)}`);
    if (errorBody && errorBody.message === 'checkpoint_required' && errorBody.checkpoint_url) {
      const challengeUrl = errorBody.checkpoint_url;
      await this._client.updateChallenge({ challengeUrl, choice: 1 });
    }
  }

  async collectFollowingsNames(userId, option, names = [], endCursor = null) {
    const action = `fetching following of user ${userId}`;
    const followingFilter = getOption(option);
    try {
      console.log(`${action}...`);
      const { page_info: pageInfo, data } = await this._getFollowings(userId, endCursor);
      const { has_next_page: hasNextPage, end_cursor: fetchedEndCursor } = pageInfo;
      pushIntoArray(data, names, 'username', 'is_verified', followingFilter);
      if (hasNextPage) {
        sleep(3000);
        await this.collectFollowingsNames(userId, option, names, fetchedEndCursor);
      }
    } catch (error) {
      await this._handleError(error, action);
    }
  }

  async findMutuals(firstUser, secondUser, option = 2) {
    const mutuals = [];
    const { id: firstId } = await this.getUserByUsername({ username: firstUser });
    const { id: secondId } = await this.getUserByUsername({ username: secondUser });

    const firstUserFollowing = [];
    await this.collectFollowingsNames(firstId, option, firstUserFollowing);

    sleep(5000);

    const secondUserFollowing = [];
    await this.collectFollowingsNames(secondId, option, secondUserFollowing);

    firstUserFollowing.reduce((tempMutuals, currentFollowing) => {
      if (secondUserFollowing.includes(currentFollowing)) {
        tempMutuals.push(currentFollowing);
      }
      return tempMutuals;
    }, mutuals);

    return mutuals;
  }
}
