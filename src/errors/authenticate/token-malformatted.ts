class TokenMalformatted {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Token malformatted.';
    this.statusCode = 401;
  }
}

export default new TokenMalformatted();
