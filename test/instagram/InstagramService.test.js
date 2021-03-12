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
      getUserByUsername: jest.fn()
    };
    service = new InstagramService({ client });
  });
  afterEach(() => {
    jest.clearAllMocks();
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
});
