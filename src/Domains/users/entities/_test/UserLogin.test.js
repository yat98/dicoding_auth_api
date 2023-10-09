const UserLogin = require("../UserLogin");

describe('a UserLogin entities', () => {
  it('should throw error error when payload did not contain needed property', () => {
    const payload = {
      username: 'dicoding',
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEED_PROPERTY');
  });

  it('should throw error when payload did not meet data type spesification', () => {
    const payload = {
      username: ['sometoken'],
      password: 'sometoken',
    }

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_SPESIFICATION');
  });

  it('should create userLogin object correctly', () => {
    const payload = {
      username: 'dicoding',
      password: 'secret',
    }

    const { username, password } = new UserLogin(payload);

    expect(username).toBe(payload.username);
    expect(password).toBe(payload.password);
  });
});