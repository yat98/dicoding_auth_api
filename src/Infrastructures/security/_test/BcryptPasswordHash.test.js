const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
  
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');
  
      expect(typeof encryptedPassword).toBe('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10);
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError compare if password not match', async () => {
      const spyCompare = jest.spyOn(bcrypt, 'compare');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');
  
      await expect(bcryptPasswordHash.comparePassword('plain_password', encryptedPassword))
        .resolves.not.toThrow(AuthenticationError);
      expect(spyCompare).toBeCalledWith('plain_password', encryptedPassword);
    });

    it('should not return AuthenticationError if password match', async () => {
      const spyCompare = jest.spyOn(bcrypt, 'compare');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');
  
      await expect(bcryptPasswordHash.comparePassword('wrong_password', encryptedPassword))
        .rejects.toThrow(AuthenticationError);
      expect(spyCompare).toBeCalledWith('wrong_password', encryptedPassword);
    });
  });
});