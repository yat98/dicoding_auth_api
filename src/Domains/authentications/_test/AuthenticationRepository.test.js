const AuthenticationRepository = require("../AuthenticationRepository");

describe('AuthenticationRepository', () => {
  it('should throw error when invoke abstract behavior', () => {
    const authenticationRepository = new AuthenticationRepository();

    expect(authenticationRepository.addToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(authenticationRepository.checkAvailableToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(authenticationRepository.deleteToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});