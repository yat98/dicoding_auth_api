const Passwordhash = require("../PasswordHash");

describe('UserRepository', () => { 
  it('should throw error when invoke abstract behavior', () => {
    const passwordHash = new Passwordhash();

    expect(passwordHash.hash('secretpassword')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
})