const UserRepository = require("../UserRepository");

describe('UserRepository', () => { 
  it('should throw error when invoke abstract behavior', () => {
    const userRepository = new UserRepository();

    expect(userRepository.addUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(userRepository.verifyAvailableUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
})