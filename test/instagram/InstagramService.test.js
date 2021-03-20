/* eslint-disable max-lines-per-function */
import InstagramService from '../../src/instagram/InstagramService';
import WrongCredentialError from '../../src/error/WrongCredentialError';

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
      getFollowings: jest.fn()
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
    it.skip('should throw error Username atau Password salah when authenticated is false', async () => {
      const expectedError = new WrongCredentialError();
      client.login.mockResolvedValue({ authenticated: false });

      actualResult = () => service.getProfile();

      await expect(actualResult()).rejects.toThrowError(expectedError);
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
    it('should return all followings of a user', async () => {
      expectedResult = ['user2', 'user3', 'user4', 'user5'];
      actualResult = [];

      const userId = 1;
      const verifiedAccOnly = false;
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
      client.getFollowings.mockResolvedValueOnce(firstFollowing);
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
      client.getFollowings.mockResolvedValueOnce(secondFollowing);
      jest.runAllTimers();

      await service.collectFollowingsNames(userId, verifiedAccOnly, actualResult);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
