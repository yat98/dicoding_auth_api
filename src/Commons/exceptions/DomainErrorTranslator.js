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
}

module.exports = DomainErrorTranslator;
