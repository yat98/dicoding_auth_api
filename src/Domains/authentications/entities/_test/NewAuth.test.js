const NewAuth = require("../NewAuth");

describe('a NewAuth entities', () => {
  it('should throw error error when payload did not contain needed property', () => {
    const payload = {
      accessToken: 'sometoken',
    };

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEED_PROPERTY');
  });

  it('should throw error when payload did not meet data type spesification', () => {
    const payload = {
      accessToken: ['sometoken'],
      refreshToken: 'sometoken',
    }

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_SPESIFICATION');
  });

  it('should create newAuth object correctly', () => {
    const payload = {
      accessToken: 'sometoken',
      refreshToken: 'sometoken',
    }

    const { accessToken, refreshToken } = new NewAuth(payload);

    expect(accessToken).toBe(payload.accessToken);
    expect(refreshToken).toBe(payload.refreshToken);
  });
});