const Jwt = require('@hapi/jwt');
const JwtTokenManager = require("../JwtTokenManager");
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      const payload = {
        username: 'dicoding',
        id: 'user-123'
      };
      const mockJwt = {
        generate: jest.fn().mockImplementation(() => 'mock_token')
      };
      const jwtTokenManager = new JwtTokenManager(mockJwt);

      const acccessToken = await jwtTokenManager.createAccessToken(payload);

      expect(mockJwt.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(acccessToken).toBe('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      const payload = {
        username: 'dicoding',
        id: 'user-123'
      };
      const mockJwt = {
        generate: jest.fn().mockImplementation(() => 'mock_token')
      };
      const jwtTokenManager = new JwtTokenManager(mockJwt);

      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      expect(mockJwt.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken).toBe('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      const payload = {
        username: 'dicoding',
        id: 'user-123'
      };
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const acccessToken = await jwtTokenManager.createAccessToken(payload);

      await expect(jwtTokenManager.verifyRefreshToken(acccessToken))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when refresh token verified', async () => {
      const payload = {
        username: 'dicoding',
        id: 'user-123'
      };
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      await expect(jwtTokenManager.verifyRefreshToken(refreshToken))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      const payload = {
        username: 'dicoding',
        id: 'user-123'
      };
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);
      const { username, id } = await jwtTokenManager.decodePayload(refreshToken);

      expect(username).toBe('dicoding');
      expect(id).toBe('user-123');
    });
  });
});