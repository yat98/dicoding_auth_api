const LoginUserUseCase = require("../../../../Applications/use_case/LoginUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(req, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const newAuth = await loginUserUseCase.execute(req.payload);

    const response = h.response({
      status: 'success',
      data: {
        ...newAuth
      }
    });
    response.code(201);
    return response;
  }
}

module.exports = AuthenticationsHandler;
