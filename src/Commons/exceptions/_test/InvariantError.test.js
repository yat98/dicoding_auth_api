const InvariantError = require('../InvariantError');

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError('an error correctly');
    expect(invariantError.statusCode).toBe(400);
    expect(invariantError.message).toBe('an error correctly');
    expect(invariantError.name).toBe('InvariantError');
  });
});
