const Passwordhash = require("../../Applications/security/PasswordHash");

class BcryptPasswordHash extends Passwordhash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }
}

module.exports = BcryptPasswordHash;
