import InstagramService from '../../src/instagram/InstagramService';

const mockLogin = jest.fn();
const mockGetProfile = jest.fn();

jest.mock('instagram-web-api', () => jest.fn().mockImplementation(() => ({
  login: mockLogin,
  getProfile: mockGetProfile
})));

describe('InstagramService', () => {
  let service;
  let expectedResult;
  let actualResult;
  beforeEach(() => {
    mockLogin.mockResolvedValue({ authenticated: true });
    service = new InstagramService();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#getProfile', () => {
    it('should return result of client.getProfile', async () => {
      expectedResult = {
        userId: 1
      };

      mockGetProfile.mockResolvedValue(expectedResult);
      actualResult = await service.getProfile();

      expect(actualResult).toEqual(expectedResult);
    });
    it('should return message Username atau Password salah when authenticated is false', async () => {
      expectedResult = {
        message: 'Username atau Password salah'
      };
      mockLogin.mockResolvedValue({ authenticated: false });

      actualResult = await service.getProfile();

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
