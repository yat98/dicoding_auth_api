const AuthenticationTokenManager = require("../AuthenticationTokenManager");

describe('AuthenticationTokenManager', () => { 
  it('should throw error when invoke abstract behavior', () => {
    const authenticationTokenManager = new AuthenticationTokenManager();

    expect(authenticationTokenManager.createAccessToken()).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');

    expect(authenticationTokenManager.createRefreshToken()).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');

    expect(authenticationTokenManager.verifyRefreshToken('')).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');

    expect(authenticationTokenManager.decodePayload('')).rejects
      .toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});