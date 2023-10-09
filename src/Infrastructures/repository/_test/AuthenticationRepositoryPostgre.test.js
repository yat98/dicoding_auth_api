const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const pool = require("../../database/postgres/pool");
const AuthenticationRepositoryPostgres = require("../AuthenticationRepositoryPostgres");

describe('AuthenticationRepositoryPostgre', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should add token to database', async () => {
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      await authenticationRepositoryPostgres.addToken('token');

      const authentication = await AuthenticationsTableTestHelper.findToken('token');

      expect(authentication[0].token).toBe('token');
      expect(authentication).toHaveLength(1);
    });
  });

  describe('checkAvailableToken', () => {
    it('should throw InvariantError if token not available', async () => {
      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      const authentication = await AuthenticationsTableTestHelper.findToken('token');

      expect(authentication).toHaveLength(0);
      await expect(authenticationRepositoryPostgres.checkAvailableToken('token'))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError if token available', async () => {
      await AuthenticationsTableTestHelper.addToken('token');

      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      const authentication = await AuthenticationsTableTestHelper.findToken('token');

      expect(authentication).toHaveLength(1);
      await expect(authenticationRepositoryPostgres.checkAvailableToken('token'))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('deleteToken', () => {
    it('should delete token from database', async () => {
      await AuthenticationsTableTestHelper.addToken('token')

      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);

      await authenticationRepositoryPostgres.deleteToken('token');

      const authentication = await AuthenticationsTableTestHelper.findToken('token');

      expect(authentication).toHaveLength(0);
      expect(authentication).toEqual([]);
    });
  });
});