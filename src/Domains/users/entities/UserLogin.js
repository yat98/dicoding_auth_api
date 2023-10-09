class UserLogin {
  constructor(payload) {
    this._verifyUserLogin(payload);

    const { username, password } = payload;

    this.username = username;
    this.password = password;
  }

  _verifyUserLogin({ username, password }) {
    if(!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEED_PROPERTY');
    }

    if(typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_SPESIFICATION');
    }
  }
}

module.exports = UserLogin;
