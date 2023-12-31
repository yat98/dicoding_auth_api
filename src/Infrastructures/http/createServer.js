const Hapi = require('@hapi/hapi');
const users = require('../../Interfaces/http/api/users/index');
const authentications = require('../../Interfaces/http/api/authentications/index');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const ClientError = require('../../Commons/exceptions/ClientError');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      value: 'Hello world!',
    }),
  });

  server.route({
    method: 'GET',
    path: '/hello',
    handler: () => ({
      value: 'Hello world!',
    }),
  });

  await server.register([
    {
      plugin: users,
      options: { container }
    },
    {
      plugin: authentications,
      options: { container },
    }
  ]);

  server.ext('onPreResponse', (req, h) => {
    const { response } = req;

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);
      
      if(translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      if(!translatedError.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'server error'
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  })

  return server;
};

module.exports = createServer;