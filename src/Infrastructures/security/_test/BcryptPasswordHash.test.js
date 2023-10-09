const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');

describe('BcryptPasswordHash', () => {
  it('should encrypt password correctly', async () => {
    const spyHash = jest.spyOn(bcrypt, 'hash');
    const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

    const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

    expect(typeof encryptedPassword).toBe('string');
    expect(encryptedPassword).not.toEqual('plain_password');
    expect(spyHash).toBeCalledWith('plain_password', 10);
  });
});