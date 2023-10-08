const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create an error correctly', () => {
    const authenticationError = new AuthenticationError('authentication error!');
    expect(authenticationError.statusCode).toBe(401);
    expect(authenticationError.message).toBe('authentication error!');
    expect(authenticationError.name).toBe('AuthenticationError');
  });
});
