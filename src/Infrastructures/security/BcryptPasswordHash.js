const Passwordhash = require("../../Applications/security/PasswordHash");
const AuthenticationError = require("../../Commons/exceptions/AuthenticationError");

class BcryptPasswordHash extends Passwordhash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async comparePassword(plain, encrypted) {
    const result = await this._bcrypt.compare(plain, encrypted);

    if(!result) throw new AuthenticationError('username or password is wrong');
  }
}

module.exports = BcryptPasswordHash;
