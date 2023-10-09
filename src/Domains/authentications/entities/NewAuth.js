class NewAuth {
  constructor(payload) {
    this._verifyNewAuth(payload);

    const { accessToken, refreshToken } = payload;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyNewAuth({ accessToken, refreshToken }) {
    if(!accessToken || !refreshToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEED_PROPERTY');
    }

    if(typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_SPESIFICATION');
    }
  }
}

module.exports = NewAuth;