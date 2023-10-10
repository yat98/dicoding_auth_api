const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const container = require("../../container");
const pool = require("../../database/postgres/pool");
const createServer = require("../createServer");
const bcrypt = require('bcrypt');

describe('/authentications endpoint', () => {
  afterAll(async() => {
    await pool.end();
  });

  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /authentications', () => {
    it('should response 201 and new authentication', async () => {
      const password = await bcrypt.hash('secret', 10);
      await UsersTableTestHelper.addUser({ username: 'dicoding', password});
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      
      expect(response.statusCode).toEqual(201);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toBe('success');
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });

    it('should response 400 when username not found', async () => {
      const password = await bcrypt.hash('secret', 10);
      await UsersTableTestHelper.addUser({ username: 'dicoding', password});
      const requestPayload = {
        username: 'dicodingindonesia',
        password: 'secret',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      
      expect(response.statusCode).toEqual(400);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toBe('fail');
      expect(responseJson.message).toBe('username not available');
    });

    it('should response 400 when password is wrong', async () => {
      const password = await bcrypt.hash('secret', 10);
      await UsersTableTestHelper.addUser({ username: 'dicoding', password});
      const requestPayload = {
        username: 'dicoding',
        password: 'secretpassword',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toBe('fail');
      expect(responseJson.message).toBe('username or password is wrong');
    });

    it('should response 400 if login payload not contain needed property', async () => {
      const password = await bcrypt.hash('secret', 10);
      await UsersTableTestHelper.addUser({ username: 'dicoding', password});
      const requestPayload = {
        username: 'dicoding',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      
      expect(response.statusCode).toEqual(400);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toBe('fail');
      expect(responseJson.message).toBe('username or password property not contain');
    });

    it('should response 400 if login payload not meet data spesification', async () => {
      const password = await bcrypt.hash('secret', 10);
      await UsersTableTestHelper.addUser({ username: 'dicoding', password});
      const requestPayload = {
        username: 'dicoding',
        password: ['secret'],
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      
      expect(response.statusCode).toEqual(400);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toBe('fail');
      expect(responseJson.message).toBe('username or password data type inapplicable');
    });
  });
});