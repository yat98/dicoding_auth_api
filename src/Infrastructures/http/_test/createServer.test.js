const createServer = require("../createServer");

describe('HTTP server', () => { 
  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'POST',
      url: '/unregisteredRoute',
    });

    expect(response.statusCode).toEqual(404);
  });

  it('should handler server error correctly', async () => {
    const requestPayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };
    const server = await createServer({});

    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });

    expect(response.statusCode).toEqual(500);
    const responseJson = JSON.parse(response.payload);
    expect(responseJson.status).toBe('error');
    expect(responseJson.message).toBe('server error');
  });
})