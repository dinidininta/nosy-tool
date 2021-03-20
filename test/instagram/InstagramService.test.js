/* eslint-disable max-lines-per-function */
import InstagramService from '../../src/instagram/InstagramService';

describe('InstagramService', () => {
  let service;
  let expectedResult;
  let actualResult;
  let client;
  beforeEach(() => {
    client = {
      login: jest.fn(),
      getProfile: jest.fn(),
      getUserByUsername: jest.fn(),
      getFollowings: jest.fn(),
      updateChallenge: jest.fn()
    };
    service = new InstagramService({ client });
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
  describe('#getProfile', () => {
    it('should return result of client.getProfile', async () => {
      expectedResult = {
        userId: 1
      };

      client.getProfile.mockResolvedValue(expectedResult);
      actualResult = await service.getProfile();

      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('#getUserByUsername', () => {
    let username;
    it('should return user data when there is username input', async () => {
      username = 'user1';
      client.getUserByUsername.mockResolvedValue(username);

      actualResult = await service.getUserByUsername(username);

      expect(actualResult).toEqual(username);
    });
  });
  describe('#collectFollowingsNames', () => {
    let option;
    const userId = 1;
    const firstFollowing = {
      page_info: {
        has_next_page: true,
        end_cursor: 'asdaadada'
      },
      data: [
        {
          is_verified: true,
          username: 'user2'
        },
        {
          is_verified: false,
          username: 'user3'
        }
      ]
    };
    const secondFollowing = {
      page_info: {
        has_next_page: false,
        end_cursor: null
      },
      data: [
        {
          is_verified: true,
          username: 'user4'
        },
        {
          is_verified: false,
          username: 'user5'
        }
      ]
    };
    it('should return all followings of a user when the option is 2 (all accounts)', async () => {
      expectedResult = ['user2', 'user3', 'user4', 'user5'];
      actualResult = [];

      client.getFollowings.mockResolvedValueOnce(firstFollowing);
      client.getFollowings.mockResolvedValueOnce(secondFollowing);
      option = 2;
      jest.runAllTimers();

      await service.collectFollowingsNames(userId, option, actualResult);

      expect(actualResult).toEqual(expectedResult);
    });
    it('should return only verified followings of a user when the option is 0 (verified only)', async () => {
      expectedResult = ['user2', 'user4'];
      actualResult = [];

      client.getFollowings.mockResolvedValueOnce(firstFollowing);
      client.getFollowings.mockResolvedValueOnce(secondFollowing);
      option = 0;
      jest.runAllTimers();

      await service.collectFollowingsNames(userId, option, actualResult);

      expect(actualResult).toEqual(expectedResult);
    });
    it('should return only non verified followings of a user when the option is 1 (non verified only)', async () => {
      expectedResult = ['user3', 'user5'];
      actualResult = [];

      client.getFollowings.mockResolvedValueOnce(firstFollowing);
      client.getFollowings.mockResolvedValueOnce(secondFollowing);
      option = 1;
      jest.runAllTimers();

      await service.collectFollowingsNames(userId, option, actualResult);

      expect(actualResult).toEqual(expectedResult);
    });
    it('should call client.updateChallenge when there is checkpoint error when fetching followings', async () => {
      const expectedError = {
        error: {
          message: 'checkpoint_required',
          checkpoint_url: 'localhost'
        }
      };
      expectedResult = {
        challengeUrl: expectedError.error.checkpoint_url,
        choice: 1
      };
      client.getFollowings.mockRejectedValue(expectedError);
      option = 2;
      jest.runAllTimers();

      await service.collectFollowingsNames(userId, option, []);

      expect(client.updateChallenge).toHaveBeenCalledWith(expectedResult);
    });
  });
  describe('#findMutuals', () => {
    it('should return mutuals between two users', async () => {
      expectedResult = ['rosie', 'lisa'];

      const verifiedAccOnly = true;
      const firstUser = 'jisoo';
      const firstUserFollowing = {
        page_info: {
          has_next_page: false,
          end_cursor: null
        },
        data: [
          {
            is_verified: true,
            username: 'rosie'
          },
          {
            is_verified: true,
            username: 'lisa'
          },
          {
            is_verified: false,
            username: 'wendy'
          },
          {
            is_verified: true,
            username: 'seulgi'
          }
        ]
      };
      client.getUserByUsername.mockResolvedValueOnce({ id: 1 });
      client.getFollowings.mockResolvedValueOnce(firstUserFollowing);

      const secondUser = 'jennie';
      const secondUserFollowing = {
        page_info: {
          has_next_page: false,
          end_cursor: null
        },
        data: [
          {
            is_verified: true,
            username: 'rosie'
          },
          {
            is_verified: true,
            username: 'lisa'
          },
          {
            is_verified: false,
            username: 'wendy'
          },
          {
            is_verified: true,
            username: 'yeri'
          }
        ]
      };
      client.getUserByUsername.mockResolvedValueOnce({ id: 2 });
      client.getFollowings.mockResolvedValueOnce(secondUserFollowing);
      jest.runAllTimers();

      actualResult = await service.findMutuals(firstUser, secondUser, verifiedAccOnly);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
