const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  }
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot create user, property not contain'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError('cannot create user, data type inapplicable'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('cannot create user, username character exceeds the limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('cannot create user, username contain restricted character'),

  'USER_LOGIN.NOT_CONTAIN_NEED_PROPERTY': new InvariantError('username or password property not contain'),
  'USER_LOGIN.NOT_MEET_DATA_SPESIFICATION': new InvariantError('username or password data type inapplicable'),
}

module.exports = DomainErrorTranslator;
